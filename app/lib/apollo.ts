// Import core Apollo Client classes from specific modules to avoid CommonJS issues
import { ApolloClient } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import { from } from '@apollo/client/link/core';

// Import link modules
import { createHttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// Import TOKEN_KEY from auth service
import { TOKEN_KEY } from '../services/authService';
// Import safe localStorage methods
import { safeLocalStorageGet } from '../utils/browser';

// Create an HTTP link to our GraphQL API
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }: any) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Auth link for adding token to headers
const authLink = setContext((_: any, { headers }: { headers?: Record<string, string> }) => {
  // Get the authentication token from local storage
  const token = safeLocalStorageGet(TOKEN_KEY);
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Create and export the Apollo Client instance
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
}); 