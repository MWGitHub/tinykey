const Hapi = require('hapi');
const config = require('./config');
const database = require('./lib/db');
const user = require('./lib/user');

const server = new Hapi.Server();
const databaseInstance = database();

server.connection({
  host: config.host,
  port: config.port
});

server.route({
  method: 'GET',
  path: '/ping',
  handler: function (request, reply) {
    return reply('hello world');
  }
});

server.register([
  {
    register: user,
    options: {
      database: database
    }
  }
])

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});