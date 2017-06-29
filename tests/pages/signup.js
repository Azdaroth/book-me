import {
  create,
  visitable,
  clickable,
  fillable,
} from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';

export default create({
  visit: visitable('/'),
  goToSignup: clickable(testSelector('signup-link')),
  email: fillable(testSelector('signup-email-field')),
  password: fillable(testSelector('signup-password-field')),
  passwordConfirmation: fillable(testSelector('signup-password-confirmation-field')),
  submit: clickable(testSelector('signup-submit-btn')),
});
