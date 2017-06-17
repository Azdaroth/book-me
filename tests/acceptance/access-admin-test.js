/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'book-me/tests/helpers/module-for-acceptance';
import { authenticateSession, } from 'book-me/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | access admin');

test('it is not possible to visit `admin` without authentication', function(assert) {
  assert.expect(1);

  visit('/admin');

  andThen(() => {
    assert.equal(currentPath(), 'login', 'should not be an admin route for not authenticated users');
  });
});


test('it is possible to visit `admin` when user is authenticated', function(assert) {
  assert.expect(1);

  const user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  visit('/admin');

  andThen(() => {
    assert.equal(currentPath(), 'admin', 'should be an admin route');
  });
});
