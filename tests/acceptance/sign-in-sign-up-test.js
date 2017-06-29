/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'book-me/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';
import ENV from 'book-me/config/environment';
import Mirage from 'ember-cli-mirage';
import signupPage from 'book-me/tests/pages/signup';

const {
  validPasswordForLogin,
} = ENV;

const {
  Response,
} = Mirage;

moduleForAcceptance('Acceptance | sign in sign up');
test('user can successfully sign up', function(assert) {
  assert.expect(3);

  server.post('/users', function(schema)  {
    const attributes = this.normalizedRequestAttrs();
    const expectedAttributes = {
      email: 'example@email.com',
      password: validPasswordForLogin,
    };

    assert.deepEqual(attributes, expectedAttributes, "attributes don't match the expected ones");

    return schema.users.create(attributes);
  });

  andThen(() => {
    signupPage
      .visit()
      .goToSignup()
      .email('example@email.com')
      .password(validPasswordForLogin)
      .passwordConfirmation(validPasswordForLogin)
      .submit();
  });

  andThen(() => {
    const tokenUrl = '/api/oauth/token';
    const tokenRequest = server.pretender.handledRequests.find((request) => {
      return request.url === tokenUrl;
    });

    assert.ok(tokenRequest, 'tokenRequest should be performed');
    assert.equal(currentURL(), '/admin');
  });
});

test('user cannot signup if there is an error', function(assert) {
  assert.expect(1);

  server.post('/users', () => {
    assert.notOk(true, 'request should not be performed');
  });

  andThen(() => {
    signupPage
      .visit()
      .goToSignup()
      .email('example@email.com')
      .password(validPasswordForLogin)
      .submit();
  });

  andThen(() => {
    assert.ok(find(testSelector('signup-errors')).length, 'errors should be displayed');
  });
});

test('user cannot signup if there is an error on server', function(assert) {
  assert.expect(1);

  andThen(() => {
    signupPage
      .visit()
      .goToSignup()
      .email('example@email.com')
      .password('invalidPassword')
      .passwordConfirmation('invalidPassword')
      .submit();
  });

  andThen(() => {
    assert.ok(find(testSelector('signup-errors')).length, 'errors should be displayed');
  });
});

test('user cannot signup if there is an error on server when creating a user', function(assert) {
  assert.expect(1);

  server.post('/users', () => {
    const errors = {
      errors: [
        {
          detail: 'is already taken',
          source: {
            pointer: 'data/attributes/email'
          }
        }
      ]
    };
    return new Response(422, {}, errors);
  });

  andThen(() => {
    signupPage
      .visit()
      .goToSignup()
      .email('example@email.com')
      .password(validPasswordForLogin)
      .passwordConfirmation(validPasswordForLogin)
      .submit();
  });

  andThen(() => {
    assert.ok(find(testSelector('signup-errors')).length, 'errors should be displayed');
  });
});
