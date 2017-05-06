import { module, test } from 'qunit';
import validateUserSignup from 'book-me/validators/user-signup';

module('Unit | Validator | user-signup');

test('it validates email format', function(assert) {
  assert.equal(validateUserSignup.email('email', 'invalid'), 'Email must be a valid email address');
  assert.ok(validateUserSignup.email('email', 'example@gmail.com'));
});

test('it validates password length', function(assert) {
  assert.equal(validateUserSignup.password('password', 'invalid'), 'Password is too short (minimum is 8 characters)');
  assert.ok(validateUserSignup.password('password', 'supersecretpassword123'));
});

test('it validates password confirmation', function(assert) {
  assert.equal(validateUserSignup.passwordConfirmation('passwordConfirmation', 'invalid', '',
    { password: 'supersecretpassword123' }), "Password confirmation doesn't match password");
  assert.ok(validateUserSignup.passwordConfirmation('passwordConfirmation', 'supersecretpassword123', '',
    { password: 'supersecretpassword123' }));
});
