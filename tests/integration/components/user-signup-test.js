import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import testSelector from 'ember-test-selectors';

const {
  set,
} = Ember;

moduleForComponent('user-signup', 'Integration | Component | user signup', {
  integration: true
});

test('it invokes passed `registerUser` action when clicking on signup button', function(assert) {
  const {
    $,
  } = this;

  assert.expect(1);

  const user = Ember.Object.create();
  const registerUser = (userArgument) => {
    assert.deepEqual(userArgument._content, user, 'action should be invoked with proper user argument');
  };

  set(this, 'user', user);
  set(this, 'registerUser', registerUser);

  this.render(hbs`{{user-signup user=user registerUser=registerUser}}`);

  $(testSelector('signup-email-field')).val('example@email.com').change();
  $(testSelector('signup-password-field')).val('supersecretpassword123').change();
  $(testSelector('signup-password-confirmation-field')).val('supersecretpassword123').change();

  $(testSelector('signup-submit-btn')).click();
});

test('it does not invoke passed `registerUser` action when there is a validation error and displays the error messages', function(assert) {
  const {
    $,
  } = this;

  assert.expect(1);

  const user = Ember.Object.create();
  const registerUser = () => {
    assert.notOk(true, 'action should not be called');
  };

  set(this, 'user', user);
  set(this, 'registerUser', registerUser);

  this.render(hbs`{{user-signup user=user registerUser=registerUser}}`);

  $(testSelector('signup-submit-btn')).click();

  assert.ok($(testSelector('signup-errors').length), 'errors should be displayed');
});
