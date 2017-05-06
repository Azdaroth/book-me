import {
  validateLength,
  validateConfirmation,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  email: validateFormat({ type: 'email' }),
  password: validateLength({ min: 8 }),
  passwordConfirmation: validateConfirmation({ on: 'password' }),
};
