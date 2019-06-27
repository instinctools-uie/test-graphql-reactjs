'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const logger = require('morgan');

const { PORT } = require('./constants');
require('./mongo');
const graphQLServer = require('./graphQL');

const app = express();

graphQLServer.applyMiddleware({ app });

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public/build')));

app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).json(error);
});

app.listen({ port: PORT }, () => console.log(`Server ready at http://localhost:${PORT}${graphQLServer.graphqlPath}`));
