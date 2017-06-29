import {
  create,
  visitable,
  clickable,
  fillable,
} from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';

export default create({
  visit: visitable('/'),
  goTologin: clickable(testSelector('login-link')),
  email: fillable(testSelector('login-email-field')),
  password: fillable(testSelector('login-password-field')),
  submit: clickable(testSelector('login-submit-btn')),
});
