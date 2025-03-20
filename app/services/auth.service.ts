import { apolloClient } from '../lib/apollo';
import { LOGIN, REGISTER, UPDATE_USER, GET_CURRENT_USER } from '../graphql';
import type { AuthPayload, LoginInput, RegisterUserInput, UpdateUserInput, User } from '../types/graphql';
import { safeLocalStorageGet, safeLocalStorageSet, safeLocalStorageRemove } from '../utils/browser';

// Token storage keys
const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Authentication Service
 * Handles user authentication, registration, and profile management
 */
export class AuthService {
  /**
   * Store authentication token in localStorage
   */
  static setToken(token: string): void {
    safeLocalStorageSet(AUTH_TOKEN_KEY, token);
  }

  /**
   * Get the stored authentication token
   */
  static getToken(): string | null {
    return safeLocalStorageGet(AUTH_TOKEN_KEY);
  }

  /**
   * Remove the authentication token from storage
   */
  static removeToken(): void {
    safeLocalStorageRemove(AUTH_TOKEN_KEY);
  }

  /**
   * Check if user is currently authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Authenticate a user with email and password
   */
  static async login(credentials: LoginInput): Promise<AuthPayload> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: LOGIN,
        variables: { email: credentials.email, password: credentials.password }
      });
      
      // Store the token
      if (data?.login?.token) {
        this.setToken(data.login.token);
      }
      
      return data.login;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Register a new user
   */
  static async register(userData: RegisterUserInput): Promise<AuthPayload> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: REGISTER,
        variables: { input: userData }
      });
      
      // Store the token
      if (data?.register?.token) {
        this.setToken(data.register.token);
      }
      
      return data.register;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Fetch the current authenticated user
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      // Only proceed if we have a token
      if (!this.getToken()) return null;
      
      const { data } = await apolloClient.query({
        query: GET_CURRENT_USER,
        fetchPolicy: 'network-only' // Don't use cache for this query
      });
      
      return data.getCurrentUser;
    } catch (error) {
      console.error('Get current user error:', error);
      // If we get an auth error, clear the token
      if ((error as any)?.graphQLErrors?.some((e: any) => 
        e.extensions?.code === 'UNAUTHENTICATED' || 
        e.message.includes('not authenticated')
      )) {
        this.removeToken();
      }
      return null;
    }
  }

  /**
   * Update user profile information
   */
  static async updateUser(userData: UpdateUserInput): Promise<User> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: { input: userData }
      });
      
      return data.updateUser;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  /**
   * Log out the current user
   */
  static logout(): void {
    this.removeToken();
    // Reset the Apollo Client store to clear all cached data
    apolloClient.resetStore().catch(error => {
      console.error('Error resetting store during logout:', error);
    });
  }
} 