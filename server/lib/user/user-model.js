const uuid = require('node-uuid');
const bcrypt = require('bcrypt');

const table = 'users';
const saltRounds = 10;

function checkPassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) return reject(err);
      
      resolve(res);
    });
  });
}

function user(database) {
  const model = {
    table: table,
    data: {},
    create,
    save,
    update
  };
  
  function create(properties) {
    return new Promise((resolve, reject) => {
      const id = uuid.v4();
      const email = properties.email;
      const password = properties.password;
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return reject(err);
        
        model.data.id = id;
        model.data.email = email;
        model.data.password = hash;
        
        resolve(model);
      });
    });
  }
  
  function save() {
    return database.create(model);
  }
  
  function update() {
    return database.update(model);
  }
  
  return model;
}



module.exports = {
  table,
  model: user,
  checkPassword
};