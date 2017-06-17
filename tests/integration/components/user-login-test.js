import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import testSelector from 'ember-test-selectors';

const {
  set,
} = Ember;

moduleForComponent('user-login', 'Integration | Component | user login', {
  integration: true
});

test('it invokes passed `loginUser` action when clicking on login button', function(assert) {
  const {
    $,
  } = this;

  assert.expect(1);

  const loginModel = Ember.Object.create();
  const loginUser = (loginArgument) => {
    assert.deepEqual(loginArgument._content, loginModel, 'action should be invoked with proper user argument');
  };

  set(this, 'loginUser', loginUser);

  this.render(hbs`{{user-login loginUser=loginUser}}`);

  $(testSelector('login-email-field')).val('example@email.com').change();
  $(testSelector('login-password-field')).val('password').change();

  $(testSelector('login-submit-btn')).click();
});

test('it does not invoke passed `loginUser` action when there is a validation error and displays the error messages', function(assert) {
  const {
    $,
  } = this;

  assert.expect(1);

  const loginUser = () => {
    assert.notOk(true, 'action should not be called');
  };

  set(this, 'loginUser', loginUser);

  this.render(hbs`{{user-login loginUser=loginUser}}`);

  $(testSelector('login-submit-btn')).click();

  assert.ok($(testSelector('login-errors').length), 'errors should be displayed');
});
