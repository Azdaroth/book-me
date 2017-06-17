import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserLoginValidators from 'book-me/validators/user-login';

const {
  get,
  set,
} = Ember

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    const loginModel = Ember.Object.create();
    const changeset = new Changeset(loginModel, lookupValidator(UserLoginValidators), UserLoginValidators);

    set(this, 'changeset', changeset);
  },

  actions: {
    loginUser() {
      const changeset = get(this, 'changeset');

      changeset.validate().then(() => {
        if (get(changeset, 'isValid')) {
          get(this, 'loginUser')(changeset);
        }
      });
    },
  },
});
