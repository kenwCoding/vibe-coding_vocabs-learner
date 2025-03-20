// Import core Apollo Client modules
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

// Import link modules
import { createHttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { from } from '@apollo/client/link/core';

// Import auth token key
import { TOKEN_KEY } from '../../services/authService';

/**
 * Create the HTTP link to connect to our GraphQL API
 */
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
});

/**
 * Create an error handling link for Apollo Client
 * Logs GraphQL and network errors to the console
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

/**
 * Create an auth link that adds the token to request headers
 */
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage
  const token = localStorage.getItem(TOKEN_KEY);
  
  // Return headers with auth token if available
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

/**
 * Create and configure the Apollo Client instance
 */
const apolloClient = new ApolloClient({
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

export default apolloClient; 