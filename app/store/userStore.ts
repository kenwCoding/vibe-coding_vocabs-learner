import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { isBrowser } from '../utils/browser';

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
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Mock implementation - would connect to backend in production
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          if (email === 'demo@example.com' && password === 'password') {
            const mockUser: User = {
              id: '1',
              username: 'demo_user',
              email: 'demo@example.com',
              nativeLanguage: 'en',
              preferences: {
                darkMode: false,
              },
            };
            
            set({ 
              user: mockUser, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred', 
            isLoading: false 
          });
        }
      },

      // Mock implementation - would connect to backend in production
      register: async (username: string, email: string, password: string, nativeLanguage: 'en' | 'zh') => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful registration
          const mockUser: User = {
            id: '2',
            username,
            email,
            nativeLanguage,
            preferences: {
              darkMode: false,
            },
          };
          
          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred', 
            isLoading: false 
          });
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
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