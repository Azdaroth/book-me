import Ember from 'ember';

const {
  set,
} = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('user');
  },

  setupController(controller, model) {
    this._super();

    set(controller, 'user', model);
  },

  actions: {
    registerUser(user) {
      user.save();
    },
  },
});
