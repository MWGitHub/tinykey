const knex = require('knex');

function database(config) {
  const client = knex(config);
  
  /**
   * Create an object.
   * 
   * @param  {Object} properties       properties of the model.
   * @param  {string} properties.table table of to insert into.
   * @param  {Object} properties.data  key/value pairs to store.
   * @return {Object} the model with the resulting id.
   */
  function create(properties) {
    const data = Object.assign({
      created_at: new Date(),
      updated_at: new Date()
    }, properties.data);
    
    
    return client(properties.table).insert(data, 'id');
  }
  
  /**
   * Update an object or multiple objects with the given properties.
   * 
   * @param  {Object} query the query to run.
   * @param  {Object} data  key/value pairs to update.
   * @return {Object} the model or models with the updated data.
   */
  function update(query, data) {
    const merged = Object.assign({
      updated_at: new Date()
    }, data);
    
    return query.update(merged);
  }
  
  /**
   * Tears down the database connection.
   */
  function destroy() {
    return client.destroy();
  }
  
  return {
    client,
    create,
    update,
    destroy
  }
}

module.exports = database;