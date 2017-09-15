import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  get,
  set,
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    const rental = this.modelFor('rental');
    const dailyRate = get(rental, 'dailyRate');
    const beginsAt = moment.utc(params.start);
    const finishesAt = moment.utc(params.end);
    const booking = this.store.createRecord('booking', {
      rental,
      beginsAt,
      finishesAt,
    });

    const price = get(booking, 'lengthOfStay') * dailyRate;
    set(booking, 'price',  price);

    return booking;
  },

  setupController(controller, model) {
    this._super();

    const rental = this.modelFor('rental');

    set(controller, 'booking', model);
    set(controller, 'rental', rental)
  },

  actions: {
    closeModal(booking) {
      booking.deleteRecord();

      this._transitionToRentalRoute(this)
    },

    createBooking(booking) {
      booking.save().then(this._transitionToRentalRoute.bind(this));
    },
  },

  _transitionToRentalRoute() {
    this.controllerFor('rental.show').resetRange();

    const rental = this.modelFor('rental');

    this.transitionTo('rental.show', rental);
  },
});
