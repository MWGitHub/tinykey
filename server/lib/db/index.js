'use strict';

const knex = require('knex');

function database(config) {
  const db = knex(config);
  
  /**
   * Create an object.
   * 
   * @param {Object} properties       properties of the model.
   * @param {string} properties.table table of to insert into.
   * @param {Object} properties.data  key/value pairs to store.
   */
  function create(properties) {
    const data = Object.assign({
      created_at: new Date(),
      updated_at: new Date()
    }, properties.data);
    
    return db(properties.table).insert(properties.data);
  }
  
  return {
    client: db,
    create: create
  }
}