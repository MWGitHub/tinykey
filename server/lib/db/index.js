'use strict';

const knex = require('knex');

function database(config) {
  const db = knex(config);
  
  function create(properties) {
    const data = Object.assign({
      created_at: new Date(),
      updated_at: new Date()
    }, properties.data);
    
    return db(properties.table).insert(properties.data);
  }
  
  return {
    knex: knex,
    create: create
  }
}

module.exports = database;