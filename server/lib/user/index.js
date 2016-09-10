'use strict';

const handlers = require('./user-handlers');
const routes = require('./user-routes');

function register(server, options, next) {
  const database = options.database;
  const userHandler = handlers(database);
  const userRoutes = routes(userHandler);
  
  server.route(userRoutes);
}

module.exports = register;