import { module, test } from 'qunit';
import validateUserLogin from 'book-me/validators/user-login';

module('Unit | Validator | user-login');

test('it validates email format', function(assert) {
  assert.equal(validateUserLogin.email('email', 'invalid'), 'Email must be a valid email address');
  assert.ok(validateUserLogin.email('email', 'example@gmail.com'));
});

test('it validates password length', function(assert) {
  assert.equal(validateUserLogin.password('password', 'invalid'), 'Password is too short (minimum is 8 characters)');
  assert.ok(validateUserLogin.password('password', 'supersecretpassword123'));
});
