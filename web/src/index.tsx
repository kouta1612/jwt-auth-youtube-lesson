import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
import { Router } from './Router';
import {getAccessToken} from './accessToken';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: "include",
  request: (operation) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      })
    }
  }
})

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <Router />
  </ApolloProvider>,
  document.getElementById('root')
);
 