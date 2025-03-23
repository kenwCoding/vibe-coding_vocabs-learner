import React, { createContext, useContext, useState, useEffect } from 'react';
// Import hooks from specific module paths to avoid ESM/CommonJS issues
import { useMutation, useQuery } from '@apollo/client/react/hooks';
import { useApolloClient } from '@apollo/client/react/hooks/useApolloClient';
import type { User, AuthContextType, RegisterData } from '../+types/user';
import { safeLocalStorageGet, safeLocalStorageSet, safeLocalStorageRemove, isBrowser } from '../utils/browser';
import { useUserStore } from '../store';
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  VERIFY_TOKEN_QUERY,
  getToken,
  setToken,
  removeToken,
  isAuthenticated as checkAuth,
  type LoginResponse,
  type RegisterResponse,
  type VerifyTokenResponse,
  type RegisterUserInput,
  type LoginInput
} from '../services/authService';

// Create the auth context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  clearError: () => {}
});

/**
 * AuthProvider component - Provides authentication context to the app
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const client = useApolloClient();
  
  // Zustand user store access
  const zustandUser = useUserStore(state => state.user);
  const zustandIsAuthenticated = useUserStore(state => state.isAuthenticated);
  const zustandSetUser = useUserStore(state => state.updateUser);
  const zustandLogin = useUserStore(state => state.login);
  const zustandLogout = useUserStore(state => state.logout);
  const zustandCheckAuth = useUserStore(state => state.checkAuthentication);

  // Login mutation
  const [loginMutation] = useMutation<LoginResponse>(LOGIN_MUTATION, {
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    }
  });

  // Register mutation
  const [registerMutation] = useMutation<RegisterResponse>(REGISTER_MUTATION, {
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    }
  });

  // Verify token query
  const { refetch } = useQuery<VerifyTokenResponse>(VERIFY_TOKEN_QUERY, {
    skip: !checkAuth(), // Skip if no token is available
    onCompleted: (data) => {
      if (data?.me) {
        // When token is verified, update AuthContext state
        setUser(data.me);
        
        // Ensure Zustand store is also updated with the verified user data
        const nativeLanguage = data.me.nativeLanguage === 'en' || data.me.nativeLanguage === 'zh' 
          ? data.me.nativeLanguage 
          : 'en' as const;
        
        // Update Zustand user state
        zustandSetUser({
          ...data.me,
          nativeLanguage
        } as any);
        
        // Ensure Zustand authentication state is true
        useUserStore.setState({ isAuthenticated: true });
      } else {
        // Token is invalid, remove it
        removeToken();
        setUser(null);
        
        // Also clear Zustand store
        zustandLogout();
      }
      setIsLoading(false);
    },
    onError: (error) => {
      // If the token verification fails, remove the token
      removeToken();
      setUser(null);
      
      // Also clear Zustand store
      zustandLogout();
      
      setIsLoading(false);
    }
  });

  // Migrate from old token key if needed
  useEffect(() => {
    const migrateTokenIfNeeded = () => {
      if (isBrowser) {
        const oldToken = localStorage.getItem('vocabmaster_token');
        if (oldToken) {
          localStorage.removeItem('vocabmaster_token');
          setToken(oldToken);
        }
      }
    };

    migrateTokenIfNeeded();
  }, []);

  // Synchronize AuthContext with Zustand store
  useEffect(() => {
    // If Zustand has a user but AuthContext doesn't, use Zustand's data
    if (zustandIsAuthenticated && zustandUser && !user) {
      setUser(zustandUser as unknown as User);
    }
    // If AuthContext has a user but Zustand doesn't, update Zustand
    else if (!zustandIsAuthenticated && user) {
      // Cast to compatible type for Zustand
      const nativeLanguage = user.nativeLanguage === 'en' || user.nativeLanguage === 'zh' 
        ? user.nativeLanguage 
        : 'en' as const; // Use const assertion
        
      zustandSetUser({
        ...user,
        nativeLanguage
      } as any); // Use any to bypass the type check
    }
  }, [user, zustandUser, zustandIsAuthenticated, zustandSetUser]);

  // Check authentication on mount
  useEffect(() => {
    if (checkAuth()) {
      // Token exists, verify it
      refetch().catch(() => {
        setIsLoading(false);
      });
    } else {
      // No token, set loading to false
      setIsLoading(false);
    }
  }, [refetch]);

  // Check Zustand auth state on mount
  useEffect(() => {
    zustandCheckAuth();
  }, [zustandCheckAuth]);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const input: LoginInput = { email, password };
      const { data } = await loginMutation({
        variables: { input }
      });
      
      if (data?.login) {
        setToken(data.login.token);
        setUser(data.login.user);
        
        // Update Zustand store with the user data from the response
        zustandSetUser(data.login.user as any);
        
        // Set Zustand authenticated state
        useUserStore.setState({ isAuthenticated: true });
      }
    } catch (err) {
      // Error is handled in onError
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const input: RegisterUserInput = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        nativeLanguage: userData.nativeLanguage
      };
      
      const { data } = await registerMutation({
        variables: { input }
      });
      
      if (data?.register) {
        setToken(data.register.token);
        setUser(data.register.user);
        
        // Update Zustand store with the user data from the response
        zustandSetUser(data.register.user as any);
        
        // Set Zustand authenticated state
        useUserStore.setState({ isAuthenticated: true });
      }
    } catch (err) {
      // Error is handled in onError
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    removeToken();
    setUser(null);
    
    // Synchronize with Zustand store
    zustandLogout();
    
    // Clear the Apollo cache to remove any user-specific data
    client.resetStore().catch(error => {
      console.error('Error clearing Apollo cache:', error);
    });
  };

  // Clear error function
  const clearError = (): void => {
    setError(null);
  };

  // Computed property for isAuthenticated
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth - Custom hook to use the AuthContext
 */
export const useAuth = (): AuthContextType => useContext(AuthContext); 