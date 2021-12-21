import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { gql } from "apollo-boost"

const App: React.FC = () => {
  const { data, loading } = useQuery(gql`
    {
      hello
    }
  `)

  if (loading) {
    return <div>loading...</div>
  }
  return (
    <div>{JSON.stringify(data  )}</div>
  );
}

export default App;
