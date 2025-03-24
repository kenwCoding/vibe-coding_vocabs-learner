import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { isBrowser, safeLocalStorageGet, safeLocalStorageSet, safeLocalStorageRemove } from '../utils/browser';
import { apolloClient } from '../lib/apollo';
import { 
  LOGIN_MUTATION, 
  REGISTER_MUTATION, 
  TOKEN_KEY as AUTH_TOKEN_KEY,
  type LoginInput,
  type RegisterUserInput,
  VERIFY_TOKEN_QUERY
} from '../services/authService';

/**
 * User interface representing a registered user
 */
export interface User {
  id: string;
  username: string;
  email: string;
  nativeLanguage: 'en' | 'zh';
  preferences: {
    darkMode: boolean;
    [key: string]: any;
  };
}

/**
 * Authentication state for the user
 */
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, nativeLanguage: 'en' | 'zh') => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;
  checkAuthentication: () => void;
}

/**
 * Custom storage implementation with debouncing to prevent too many localStorage writes
 * and to handle hydration more efficiently
 */
const debouncedStorage = (() => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let pendingSetItem: { key: string; value: string } | null = null;
  let hasHydrated = false;

  const processQueue = () => {
    if (!isBrowser || !pendingSetItem) return;
    
    try {
      const { key, value } = pendingSetItem;
      localStorage.setItem(key, value);
      pendingSetItem = null;
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
      pendingSetItem = null;
    }
  };

  return {
    getItem: (key: string) => {
      if (!isBrowser) return null;
      
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error('Failed to read from localStorage:', e);
        return null;
      }
    },
    setItem: (key: string, value: string) => {
      if (!isBrowser) return;
      
      // Skip repeated stores during initial hydration
      if (!hasHydrated) {
        hasHydrated = true;
        try {
          localStorage.setItem(key, value);
        } catch (e) {
          console.error('Failed to write to localStorage during hydration:', e);
        }
        return;
      }
      
      pendingSetItem = { key, value };
      
      if (timeout) {
        clearTimeout(timeout);
      }
      
      timeout = setTimeout(processQueue, 1000); // 1 second debounce
    },
    removeItem: (key: string) => {
      if (!isBrowser) return;
      
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('Failed to remove from localStorage:', e);
      }
      
      if (timeout) {
        clearTimeout(timeout);
        pendingSetItem = null;
      }
    },
  };
})();

/**
 * User store that manages authentication state
 * Uses persist middleware to maintain session across page refreshes
 */
export const useUserStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Check for token on initialization
      checkAuthentication: () => {
        const hasToken = !!safeLocalStorageGet(AUTH_TOKEN_KEY);
        if (hasToken) {
          // We have a token, but we need to validate it with the server
          // Set authenticated state based on token presence temporarily
          if (!get().isAuthenticated) {
            set({ isAuthenticated: true, isLoading: true });
          }
          
          // Verify the token against the backend
          apolloClient.query({
            query: VERIFY_TOKEN_QUERY,
            fetchPolicy: 'network-only' // Force fresh check from server, not cache
          })
          .then(({ data }) => {
            if (data?.me) {
              // Valid token, update user data
              set({ 
                user: data.me, 
                isAuthenticated: true, 
                isLoading: false 
              });
            } else {
              // Invalid token
              safeLocalStorageRemove(AUTH_TOKEN_KEY);
              set({ 
                user: null, 
                isAuthenticated: false, 
                isLoading: false 
              });
            }
          })
          .catch((error) => {
            console.error('Token verification error:', error);
            // Error verifying token, clear it
            safeLocalStorageRemove(AUTH_TOKEN_KEY);
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false,
              error: 'Session expired. Please log in again.'
            });
          });
        } else {
          // No token, ensure we're not authenticated
          if (get().isAuthenticated) {
            set({ 
              user: null, 
              isAuthenticated: false 
            });
          }
        }
      },

      // Real implementation - connects to backend GraphQL API
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const input: LoginInput = { email, password };
          const { data } = await apolloClient.mutate({
            mutation: LOGIN_MUTATION,
            variables: { input }
          });
          
          if (data?.login) {
            const { token, user } = data.login;
            
            
            // Store token and update state
            safeLocalStorageSet(AUTH_TOKEN_KEY, token);
            
            set({ 
              user: user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed. Please check your credentials.', 
            isLoading: false 
          });
        }
      },

      // Real implementation - connects to backend GraphQL API
      register: async (username: string, email: string, password: string, nativeLanguage: 'en' | 'zh') => {
        try {
          set({ isLoading: true, error: null });
          
          const input: RegisterUserInput = {
            username,
            email,
            password,
            nativeLanguage
          };
          
          const { data } = await apolloClient.mutate({
            mutation: REGISTER_MUTATION,
            variables: { input }
          });
          
          if (data?.register) {
            const { token, user } = data.register;
            
            // Store token and update state
            safeLocalStorageSet(AUTH_TOKEN_KEY, token);
            
            set({ 
              user: user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed. Please try again.', 
            isLoading: false 
          });
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
        
        // Clear token from localStorage
        safeLocalStorageRemove(AUTH_TOKEN_KEY);
        
        // Clear Apollo cache
        apolloClient.resetStore().catch(error => {
          console.error('Error clearing Apollo cache:', error);
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'user-storage', // Name for localStorage
      storage: createJSONStorage(() => debouncedStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      version: 1, // Add versioning for potential migrations
      skipHydration: !isBrowser, // Skip hydration entirely if not in browser environment
    }
  )
); 