const test = require('ava');
const co = require('co');
const user = require('../../lib/user');

test('user is created', t => {
  return co(function* () {
    const result = yield user.create({
      email: 'test@example.com',
      password: 'password'
    });
    
    t.truthy(result.id);
    t.is(result.email, 'test@example.com');
    t.not(result.password, 'password');
  });
});

test('user password is checked', t => {
  return co(function* () {
    const result = yield user.create({
      email: 'test@example.com',
      password: 'password'
    });
    
    const hash = result.password;
      
    let isValid = yield user.checkPassword('password', hash);
    
    t.true(isValid);
    
    isValid = yield user.checkPassword('something', hash);
    
    t.false(isValid);
  });
});