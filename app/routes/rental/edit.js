import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  get,
  set,
} = Ember

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.modelFor('rental');
  },

  setupController(controller, model) {
    this._super();

    set(controller, 'rental', model);
  },

  actions: {
    updateRental(changeset) {
      changeset.save().then(() => {
        this.transitionTo('admin');
      }).catch(() => {
        const errors = get(changeset._content, 'errors')

        errors.forEach(error => {
          const key = error.attribute;
          const message = error.message;

          changeset.addError(key, { validation: `${key} ${message}` });
        });
      });
    },
  },
});
