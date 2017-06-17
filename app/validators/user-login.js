import {
  validateLength,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  email: validateFormat({ type: 'email' }),
  password: validateLength({ min: 8 }),
};
