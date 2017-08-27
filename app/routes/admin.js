import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  set,
} = Ember

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.findAll('rental');
  },

  setupController(controller, model) {
    this._super();

    set(controller, 'rentals', model);
  },
});
