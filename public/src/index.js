import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import history from './services/history';
import { Routes } from './services/routes';
import { unregister } from './services/serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

function bootstrap() {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router history={history}>
        <Routes />
      </Router>
    </ApolloProvider>,
    document.getElementById('root')
  );
}

bootstrap();
unregister();
