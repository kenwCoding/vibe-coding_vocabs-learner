import React from 'react';
// Import directly from apollo.ts to ensure we're using the correct client
import { apolloClient } from './apollo';
// Import ApolloProvider using specific import to avoid CommonJS issues
import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react';

/**
 * Apollo Provider component
 * Wraps application with Apollo Client context for GraphQL operations
 */
export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseApolloProvider client={apolloClient}>
      {children}
    </BaseApolloProvider>
  );
}

export default ApolloProvider; 