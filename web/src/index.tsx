import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
import Router from './Router';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <Router />
  </ApolloProvider>,
  document.getElementById('root')
);
 