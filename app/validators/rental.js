import {
  validatePresence,
  validateNumber
} from 'ember-changeset-validations/validators';

export default {
  name: validatePresence(true),
  dailyRate: validateNumber({ integer: true, gt: 0 }),
};
