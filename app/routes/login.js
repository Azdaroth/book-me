import Ember from 'ember';

const {
  get,
  getProperties,
  inject: {
    service,
  }
} = Ember;

export default Ember.Route.extend({
  session: service(),

  actions: {
    loginUser(loginModel) {
      const { email, password } = getProperties(loginModel, 'email', 'password');

      get(this, 'session').authenticate('authenticator:oauth2', email, password).then(() => {
        this.transitionTo('admin');
      }).catch((error) => {
        loginModel.addError('login', error.message);
      });
    },
  },
});
