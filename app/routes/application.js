import Ember from 'ember';

const {
  inject: { service },
  get,
  set,
} = Ember;

export default Ember.Route.extend({
  session: service(),

  setupController(controller) {
    this._super();

    set(controller, 'session', get(this, 'session'));
  },

  actions: {
    logOut() {
      get(this, 'session').invalidate().then(() => {
        this.transitionTo('application');
      });
    },
  },
});
