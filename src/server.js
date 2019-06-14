require('es6-promise').polyfill();
require('isomorphic-fetch');

import Express from 'express';
import path from 'path'
var React = require('react');
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { getDataFromTree } from "react-apollo"
import { StaticRouter  } from 'react-router-dom'
import HomePage from './public/views/HomePage';

const ReactDOMServer = require('react-dom/server');
const PORT = 8080

const renderer = (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:4000',
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  });
  
  const context = {};
  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <HomePage />
      </StaticRouter>
    </ApolloProvider>
  );
  

  getDataFromTree(App).then(() => {
    const initialState = client.extract();
    const layout = ReactDOMServer.renderToString(App);
    const html =`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tinker North</title>
          <link rel="shortcut icon" href="/favicon.ico">
          <script>window.__APOLLO_STATE__ = ${JSON.stringify(initialState )}</script>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">

          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        </head>
        <body>
          <div id="root">
            ${layout}
          </div>
          
          <script src="/static/homepage.js~index.js"></script>
          <script src="/static/vendors~index.js"></script>
          <script src="/static/vendors~homepage.js~index.js"></script>
          <script src="/static/index.js"></script>
          <script src="/static/homepage.js"></script>
        </body>
      </html>
    `

    res.status(200);
    res.send(html);
    res.end();
  });

};

const app = Express();
app.use('/static', Express.static(path.resolve(__dirname, 'public')))
app.use('/', renderer);
app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
})