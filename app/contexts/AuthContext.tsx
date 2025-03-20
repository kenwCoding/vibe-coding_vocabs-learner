import React, { createContext, useContext, useState, useEffect } from 'react';
// Import hooks from specific module paths to avoid ESM/CommonJS issues
import { useMutation, useQuery } from '@apollo/client/react/hooks';
import { useApolloClient } from '@apollo/client/react/hooks/useApolloClient';
import type { User, AuthContextType, RegisterData } from '../+types/user';
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
      if (data?.verifyToken) {
        setUser(data.verifyToken);
      } else {
        // Token is invalid, remove it
        removeToken();
      }
      setIsLoading(false);
    },
    onError: () => {
      // If the token verification fails, remove the token
      removeToken();
      setUser(null);
      setIsLoading(false);
    }
  });

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