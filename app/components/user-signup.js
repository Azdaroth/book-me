import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserSignupValidators from 'book-me/validators/user-signup';

const {
  get,
  set,
} = Ember

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    const user = get(this, 'user');
    const changeset = new Changeset(user, lookupValidator(UserSignupValidators), UserSignupValidators);

    set(this, 'changeset', changeset);
  },

  actions: {
    registerUser() {
      const changeset = get(this, 'changeset');

      changeset.validate().then(() => {
        if (get(changeset, 'isValid')) {
          get(this, 'registerUser')(changeset);
        }
      });
    },
  },
});
