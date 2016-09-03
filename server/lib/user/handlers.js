'use strict';

const userModel = require('./model');

function handlers(database) {
  function create(request, reply) {
    const email = request.payload.email;
    const password = request.payload.password;
    
    const user = userModel.create({ email, password });
    
    user.save(database, user);
  }
  
  return {
    create: create
  };
}

module.exports = handlers;