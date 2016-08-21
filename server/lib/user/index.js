'use strict';

const uuid = require('node-uuid');
const bcrypt = require('bcrypt');

const saltRounds = 10;

function create(properties) {
  return new Promise((resolve, reject) => {
    const id = uuid.v4();
    const email = properties.email;
    const password = properties.password;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject(err);
      resolve({
        id: id,
        email: email,
        password: hash
      });
    });
  });
}

function checkPassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

module.exports = {
  create: create,
  checkPassword: checkPassword
};