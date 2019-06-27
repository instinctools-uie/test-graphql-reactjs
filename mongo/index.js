const mongoose = require('mongoose');

const { MONGO_CONNECTION_URL } = require('../constants');

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_CONNECTION_URL, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log(`Connected to mongo at ${MONGO_CONNECTION_URL}`))
  .on('error', (error) => console.error('Connection to mongo error:', error.message));

module.exports = mongoose;
