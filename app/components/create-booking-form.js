import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import BookingValidators from 'book-me/validators/booking';

const {
  get,
  set,
} = Ember;

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    const rentalBookings = get(this, 'rentalBookings');
    const booking = get(this, 'booking')
    const validators = BookingValidators(rentalBookings);
    const changeset = new Changeset(booking, lookupValidator(validators), validators);

    set(this, 'changeset', changeset);
  },

  actions: {
    createBooking() {
      const changeset = get(this, 'changeset');

      changeset.validate().then(() => {
        if (get(changeset, 'isValid')) {
          get(this, 'onCreateBooking')(changeset)
        }
      });
    },

    cancelCreation() {
      const booking = get(this, 'booking');

      get(this, 'onCancelCreation')(booking);
    },
  },
});
