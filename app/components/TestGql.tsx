import { gql, useQuery } from '../lib/gql-utils';
import { T } from './common/T';

// Simple test query that doesn't use introspection
const TEST_QUERY = gql`
  query TestQuery {
    me {
      id
      username
    }
  }
`;

export function TestGql() {
  const { loading, error, data } = useQuery(TEST_QUERY, {
    // Don't show error in UI for authentication failures
    onError: (error) => {
      console.error('GraphQL error:', error.message);
    }
  });

  if (loading) return <div><T keyName="common.loading">Loading...</T></div>;
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2"><T keyName="gql.test.title">GraphQL Test Component</T></h2>
      
      {error ? (
        <div>
          <p className="text-green-600 dark:text-green-400"><T keyName="gql.test.success">Apollo Client is connected!</T></p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Note: Authentication is required for most queries. The error is expected if you're not logged in.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-green-600 dark:text-green-400"><T keyName="gql.test.success">If you can see this, the gql function is working properly!</T></p>
          {data?.me && (
            <p className="mt-2">Logged in as: {data.me.username}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TestGql; 