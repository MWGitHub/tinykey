const test = require('tape');
const co = require('co');
const user = require('../../lib/user/user-model');
const knexfile = require('../../knexfile').test;
const database = require('../../lib/db');

function setupDatabase() {
  return co(function* () {
    const db = database(knexfile);
    
    yield db.client('users').del();
    
    return db;
  });
}

function destroyDatabase(db) {
  return db.destroy();
}

test('user is created', t => {
  return co(function* () {
    const db = yield setupDatabase();
    const model = user.model(db);
    
    yield model.create({
      email: 'test@example.com',
      password: 'password'
    });
    
    t.ok(model.data.id);
    t.is(model.data.email, 'test@example.com');
    t.not(model.data.password, 'password');
    
    yield destroyDatabase(db);
    t.end();
  }).catch(t.end);
});

test('user password is checked', t => {
  return co(function* () {
    const db = yield setupDatabase();
    const model = user.model(db);
    
    yield model.create({
      email: 'test@example.com',
      password: 'password'
    });
    
    const hash = model.data.password;
      
    let isValid = yield user.checkPassword('password', hash);
    
    t.true(isValid);
    
    isValid = yield user.checkPassword('something', hash);
    
    t.false(isValid);
    
    yield destroyDatabase(db);
    t.end();
  }).catch(t.end);
});