/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'book-me/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';
import Mirage from 'ember-cli-mirage';
import signupPage from 'book-me/tests/pages/signup';

const {
  Response,
} = Mirage;

moduleForAcceptance('Acceptance | sign in sign up', {
  beforeEach() {
    this.email = 'example@email.com';
    this.password = 'password123';
  }
});
test('user can successfully sign up', function(assert) {
  assert.expect(3);

  const { email, password } = this;

  server.post('/users', function(schema)  {
    const attributes = this.normalizedRequestAttrs();
    const expectedAttributes = {
      email: email,
      password: password,
    };

    assert.deepEqual(attributes, expectedAttributes, "attributes don't match the expected ones");

    return schema.users.create(attributes);
  });

  andThen(() => {
    signupPage
      .visit()
      .goToSignup()
      .email(email)
      .password(password)
      .passwordConfirmation(password)
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

  const { email, password } = this;

  server.post('/users', () => {
    assert.notOk(true, 'request should not be performed');
  });

  andThen(() => {
    signupPage
      .visit()
      .goToSignup()
      .email(email)
      .password(password)
      .submit();
  });

  andThen(() => {
    assert.ok(find(testSelector('signup-errors')).length, 'errors should be displayed');
  });
});

test('user cannot signup if there is an error on server when fetching a token', function(assert) {
  assert.expect(1);

  const { email, password } = this;

  server.post('/oauth/token', () => {
    return new Response(401, {}, { message: 'invalid credentials' });
  });

  andThen(() => {
    signupPage
      .visit()
      .goToSignup()
      .email(email)
      .password(password)
      .passwordConfirmation(password)
      .submit();
  });

  andThen(() => {
    assert.ok(find(testSelector('signup-errors')).length, 'errors should be displayed');
  });
});

test('user cannot signup if there is an error on server when creating a user', function(assert) {
  assert.expect(1);

  const { email, password } = this;

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
      .email(email)
      .password(password)
      .passwordConfirmation(password)
      .submit();
  });

  andThen(() => {
    assert.ok(find(testSelector('signup-errors')).length, 'errors should be displayed');
  });
});
