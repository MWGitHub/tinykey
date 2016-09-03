'use strict';

const handlers = require('./handlers');
const routes = require('./routes');

function register(server, options, next) {
  const database = options.database;
  const userHandler = handlers(database);
  const userRoutes = routes(userHandler);
  
  server.route(userRoutes);
}

module.exports = register;