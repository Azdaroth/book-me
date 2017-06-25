import Ember from 'ember';

const {
  set,
  get,
  getProperties,
  inject: {
    service,
  }
} = Ember;

export default Ember.Route.extend({
  session: service(),

  model() {
    return this.store.createRecord('user');
  },

  setupController(controller, model) {
    this._super();

    set(controller, 'user', model);
  },

  actions: {
    registerUser(user) {
      user.save().then(() => {
        const { email, password } = getProperties(user, 'email', 'password');

        get(this, 'session').authenticate('authenticator:oauth2', email, password).then(() => {
          this.transitionTo('admin');
        }).catch((error) => {
          user.addError('signup', error.message);
        });
      }).catch(() => {
        get(user._content, 'errors').forEach(({ attribute, message }) => {
          user.pushErrors(attribute, message);
        });
      });
    },
  },
});
