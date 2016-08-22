'use strict';

const knex = require('knex');

function database(config) {
  const db = knex(config);
  
  function create(properties) {
    return db(properties.table).insert(properties.data);
  }
  
  return {
    knex: knex,
    create: create
  }
}

module.exports = database;