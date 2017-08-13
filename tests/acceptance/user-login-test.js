/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'book-me/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';
import loginPage from 'book-me/tests/pages/login';

moduleForAcceptance('Acceptance | user login', {
  beforeEach() {
    const email = 'example@email.com';
    const password = 'password123';

    this.email = email;
    this.password = password;
    this.user = server.create('user', { email, password, });
  }
});

test('user can successfully log in and is redirected to /admin route', function(assert) {
  assert.expect(1);

  const { email, password } = this;

  andThen(() => {
    loginPage
      .visit()
      .goTologin()
      .email(email)
      .password(password)
      .submit();
  });

  andThen(() => {
    assert.equal(currentPath(), 'admin', 'should be an admin route');
  });
});

test('user cannot log in with invalid credentials and sees the error messages from client', function(assert) {
  assert.expect(2);

  andThen(() => {
    loginPage
      .visit()
      .goTologin()
      .email('')
      .password('')
      .submit();
  });

  andThen(() => {
    assert.equal(currentPath(), 'login', 'should still be a login route');
    assert.ok(find(testSelector('login-errors')).length, 'errors should be displayed');
  });
});

test('user cannot log in with invalid credentials and sees the error messages from server', function(assert) {
  assert.expect(2);

  andThen(() => {
    loginPage
      .visit()
      .goTologin()
      .email(this.email)
      .password('invalidPassword')
      .submit();
  });

  andThen(() => {
    assert.equal(currentPath(), 'login', 'should still be a login route');
    assert.ok(find(testSelector('login-errors')).length, 'errors should be displayed');
  });
});
