const test = require('ava');
const co = require('co');
const user = require('../../lib/user/model');

test('user is created', t => {
  return co(function* () {
    const result = yield user.create({
      email: 'test@example.com',
      password: 'password'
    });
    
    t.truthy(result.data.id);
    t.is(result.data.email, 'test@example.com');
    t.not(result.data.password, 'password');
  });
});

test('user password is checked', t => {
  return co(function* () {
    const result = yield user.create({
      email: 'test@example.com',
      password: 'password'
    });
    
    const hash = result.data.password;
      
    let isValid = yield user.checkPassword('password', hash);
    
    t.true(isValid);
    
    isValid = yield user.checkPassword('something', hash);
    
    t.false(isValid);
  });
});