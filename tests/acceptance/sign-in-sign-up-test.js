/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'book-me/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | sign in sign up');
test('user can successfully sign up', function(assert) {
  assert.expect(1);

  server.post('/users', function(schema)  {
    const attributes = this.normalizedRequestAttrs();
    const expectedAttributes = {
      email: 'example@email.com',
      password: 'supersecretpassword123',
    };

    assert.deepEqual(attributes, expectedAttributes, "attributes don't match the expected ones");

    return schema.users.create(attributes);
  });

  visit('/');

  click(testSelector('signup-link'));

  andThen(() => {
    fillIn(testSelector('signup-email-field'), 'example@email.com');
    fillIn(testSelector('signup-password-field'), 'supersecretpassword123');
    fillIn(testSelector('signup-password-confirmation-field'), 'supersecretpassword123');

    click(testSelector('signup-submit-btn'));
  });
});

test('user cannot signup if there is an error', function(assert) {
  assert.expect(1);

  server.post('/users', () => {
    assert.notOk(true, 'request should not be performed');
  });

  visit('/');

  click(testSelector('signup-link'));

  andThen(() => {
    fillIn(testSelector('signup-email-field'), 'example@email.com');
    fillIn(testSelector('signup-password-field'), 'supersecretpassword123');

    click(testSelector('signup-submit-btn'));
  });

  andThen(() => {
    assert.ok(testSelector('signup-errors').length, 'errors should be displayed');
  });
});
