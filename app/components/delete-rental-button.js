import Ember from 'ember';
import resolveDelay from 'book-me/utilities/resolve-delay';

const {
  get,
  inject,
} = Ember;

export default Ember.Component.extend({
  delay: resolveDelay(3000),
  notify: inject.service(),

  actions: {
    deleteRental() {
      const rental = get(this, 'rental');

      rental.destroyRecord().then(() => {
        const notify = get(this, 'notify');

        notify.info('Rental is deleted');
      });
    },
  },
});
