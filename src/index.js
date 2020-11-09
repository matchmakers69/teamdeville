import './style.scss';

import configureStore, { history } from './configureStore';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { render } from 'react-dom';

const cache = new InMemoryCache({
  dataIdFromObject: (object) => object.key || null,
});
const link = new HttpLink({
  uri: 'http://teamdeville.co.uk/reactMonster/graphql',
});

const client = new ApolloClient({
  cache,
  link,
});

const store = configureStore();

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('page')
);
