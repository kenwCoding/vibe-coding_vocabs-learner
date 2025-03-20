/**
 * User interface - defines the structure of the User object from the API
 */
export interface User {
  id: string;
  username: string;
  email: string;
  nativeLanguage: string;
  preferences: UserPreferences;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  darkMode?: boolean;
  receiveNotifications?: boolean;
  [key: string]: any;
}

/**
 * Authentication context interface
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

/**
 * Login data interface
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Register data interface
 */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  nativeLanguage: string;
} 