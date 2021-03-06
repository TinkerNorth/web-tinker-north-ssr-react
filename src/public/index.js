import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

import HomePage from './views/HomePage';

import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'


const apollo_client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: `http://localhost:4000`,
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

const application = (
  <ApolloProvider client={apollo_client}>
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  </ApolloProvider>
);
ReactDOM.hydrate(application, document.getElementById('root'));



