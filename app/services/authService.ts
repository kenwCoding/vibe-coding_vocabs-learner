import { gql } from '../lib/gql-utils';
import type { User } from '../+types/user';
import { safeLocalStorageGet, safeLocalStorageSet, safeLocalStorageRemove } from '../utils/browser';

// Define GraphQL mutation operations
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
  mutation Register($input: RegisterInput!) {
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
  query VerifyToken {
    verifyToken {
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

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  nativeLanguage: string;
}

export interface VerifyTokenResponse {
  verifyToken: User | null;
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