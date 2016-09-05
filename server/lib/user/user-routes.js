'use strict';

const defaultPath = '/users';
const joi = require('joi');

function routes(handlers, path = defaultPath) {
  return {
    path: path,
    method: 'POST',
    handler: handlers.create,
    config: {
      validate: {
        payload: {
          email: joi.string().email(),
          password: joi.string()
        }
      }
    }
  };
}

module.exports = routes;