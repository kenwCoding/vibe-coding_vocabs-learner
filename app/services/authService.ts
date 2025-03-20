import { gql } from '../lib/gql-utils';
import type { User } from '../+types/user';
import { safeLocalStorageGet, safeLocalStorageSet, safeLocalStorageRemove } from '../utils/browser';

// Define GraphQL mutation operations
export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
        nativeLanguage
        preferences {
          darkMode
        }
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterUserInput!) {
    register(input: $input) {
      token
      user {
        id
        username
        email
        nativeLanguage
        preferences {
          darkMode
        }
      }
    }
  }
`;

export const VERIFY_TOKEN_QUERY = gql`
  query VerifyCurrentUser {
    me {
      id
      username
      email
      nativeLanguage
      preferences {
        darkMode
      }
    }
  }
`;

// Response types for GraphQL operations
export interface LoginResponse {
  login: {
    token: string;
    user: User;
  };
}

export interface RegisterResponse {
  register: {
    token: string;
    user: User;
  };
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
  nativeLanguage: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface VerifyTokenResponse {
  me: User | null;
}

// Authentication utilities
export const TOKEN_KEY = 'vocabmaster_token';

export const getToken = (): string | null => {
  return safeLocalStorageGet(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  safeLocalStorageSet(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  safeLocalStorageRemove(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
}; 