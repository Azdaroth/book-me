/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'book-me/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';
import ENV from 'book-me/config/environment';

const {
  validPasswordForLogin,
} = ENV;

moduleForAcceptance('Acceptance | user login', {
  beforeEach() {
    const userEmail = 'examile@email.com';

    this.userEmail = userEmail;
    this.user = server.create('user', { email: userEmail, password: validPasswordForLogin })
  }
});

test('user can successfully log in and is redirected to /admin route', function(assert) {
  assert.expect(1);

  visit('/');

  click(testSelector('login-link'));

  andThen(() => {
    fillIn(testSelector('login-email-field'), this.userEmail);
    fillIn(testSelector('login-password-field'), validPasswordForLogin);

    click(testSelector('login-submit-btn'));
  });

  andThen(() => {
    assert.equal(currentPath(), 'admin', 'should be an admin route');
  });
});

test('user cannot log in with invalid credentials and sees the error messages from client', function(assert) {
  assert.expect(2);

  visit('/');

  click(testSelector('login-link'));

  andThen(() => {
    fillIn(testSelector('login-email-field'), '');
    fillIn(testSelector('login-password-field'), '');

    click(testSelector('login-submit-btn'));
  });

  andThen(() => {
    assert.equal(currentPath(), 'login', 'should still be a login route');
    assert.ok(find(testSelector('login-errors')).length, 'errors should be displayed');
  });
});


test('user cannot log in with invalid credentials and sees the error messages from server', function(assert) {
  assert.expect(2);

  visit('/');

  click(testSelector('login-link'));

  andThen(() => {
    fillIn(testSelector('login-email-field'), this.userEmail);
    fillIn(testSelector('login-password-field'), 'invalidPassword');

    click(testSelector('login-submit-btn'));
  });

  andThen(() => {
    assert.equal(currentPath(), 'login', 'should still be a login route');
    assert.ok(find(testSelector('login-errors')).length, 'errors should be displayed');
  });
});
