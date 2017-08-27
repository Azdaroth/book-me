import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import RentalValidators from 'book-me/validators/rental';

const {
  get,
  set,
} = Ember

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    const rental = get(this, 'rental');
    const changeset = new Changeset(rental, lookupValidator(RentalValidators), RentalValidators);

    set(this, 'changeset', changeset);
  },

  actions: {
    persistRental() {
      const changeset = get(this, 'changeset');

      changeset.validate().then(() => {
        if (get(changeset, 'isValid')) {
          get(this, 'persistRental')(changeset);
        }
      });
    },
  },
});
