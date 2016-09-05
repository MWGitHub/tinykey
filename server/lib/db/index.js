const knex = require('knex');

function database(config) {
  const client = knex(config);
  
  /**
   * Create an object.
   * 
   * @param  {Object} properties       properties of the model.
   * @param  {string} properties.table table of to insert into.
   * @param  {Object} properties.data  key/value pairs to store.
   * @return {Object} the promise with an array with the resulting ids.
   */
  function create(properties) {
    const data = Object.assign({
      created_at: new Date(),
      updated_at: new Date()
    }, properties.data);
    
    
    return client(properties.table)
      .insert(data, 'id');
  }
  
  /**
   * Update an object.
   * 
   * @param  {string} column           check the value against this.
   * @param  {Object} value            value to check with.
   * @param  {Object} properties       properties of the model.
   * @param  {string} properties.table table of to insert into.
   * @param  {Object} properties.data  key/value pairs to store.
   * @return {Object} the promise with the number of updated rows.
   */
  function update(column, value, properties) {
    const data = Object.assign({
      updated_at: new Date()
    }, properties.data);
    
    return client(properties.table)
      .where(column, value)
      .update(data);
  }
  
  /**
   * Retrieves an object.
   * 
   * @param  {string} table  table to retrieve from.
   * @param  {string} column check the value against this.
   * @param  {Object} value  value to check with.
   * @return {Object} the promise with the retrieved data.
   */
  function retrieve(table, column, value) {
    return client(table).select('*').where(column, value);
  }
  
  /**
   * Close the database connection.
   */
  function close() {
    return client.destroy();
  }
  
  return {
    client,
    create,
    update,
    close
  }
}

module.exports = database;