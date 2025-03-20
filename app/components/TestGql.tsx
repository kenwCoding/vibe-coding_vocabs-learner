import { gql, useQuery } from '../lib/gql-utils';
import { T } from './common/T';

// Test query
const TEST_QUERY = gql`
  query TestQuery {
    __schema {
      queryType {
        name
      }
    }
  }
`;

export function TestGql() {
  const { loading, error } = useQuery(TEST_QUERY);

  if (loading) return <div><T keyName="common.loading">Loading...</T></div>;
  if (error) return <div><T keyName="common.error" values={{ message: error.message }}>Error: {error.message}</T></div>;

  return (
    <div>
      <h2><T keyName="gql.test.title">GraphQL Test Component</T></h2>
      <p><T keyName="gql.test.success">If you can see this, the gql function is working properly!</T></p>
    </div>
  );
}

export default TestGql; 