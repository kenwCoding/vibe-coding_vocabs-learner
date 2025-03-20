/**
 * GraphQL tag function utility
 * 
 * This file provides a proper gql tag function that works with Vite SSR
 */

// Import the raw parse function from graphql
import { parse } from 'graphql';

// Re-export common hooks from specific modules
import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { useLazyQuery } from '@apollo/client/react/hooks/useLazyQuery';

// Re-export for convenience
export { useQuery, useMutation, useLazyQuery };

/**
 * Template tag function for GraphQL queries
 * This implementation ensures compatibility with Vite SSR
 */
export function gql(strings: TemplateStringsArray, ...expressions: any[]) {
  let str = '';
  strings.forEach((string, i) => {
    str += string;
    if (i < expressions.length) {
      str += expressions[i];
    }
  });
  
  // Parse the string to an AST
  const parsed = parse(str);
  
  // Add a toString method that returns the original string
  Object.defineProperty(parsed, 'toString', {
    value: () => str,
    enumerable: false
  });
  
  return parsed;
} 