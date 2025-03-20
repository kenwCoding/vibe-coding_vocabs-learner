import { gql } from '../lib/gql-utils';

// Queries
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      username
      email
      nativeLanguage
      preferences {
        darkMode
      }
      createdAt
      updatedAt
    }
  }
`;

// Mutations
export const LOGIN = gql`
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

export const REGISTER = gql`
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

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      username
      email
      nativeLanguage
      preferences {
        darkMode
      }
      updatedAt
    }
  }
`; 