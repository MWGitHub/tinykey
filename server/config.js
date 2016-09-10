const knexConfig = require('./knexfile');

module.exports = {
  host: process.env.IP,
  port: process.env.PORT,
  database: knexConfig
};