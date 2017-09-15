import Ember from 'ember';
import moment from 'moment';

const {
  get,
  set,
} = Ember;

export default Ember.Controller.extend({
  range: {
    start: null,
    end: null,
  },

  resetRange() {
    set(this, 'range', { start: null, end: null });
  },

  actions: {
    selectRange(range) {
      set(this, 'range', range);

      if (range.start && range.end) {
        const rental = get(this, 'rental');
        const start = toUTCDate(range.start).set({
          hour: get(rental, 'defaultArrivalHour')
        });
        const end = toUTCDate(range.end).set({
          hour: get(rental, 'defaultDepartureHour')
        });
        this.transitionToRoute('rental.show.createBooking', rental, {
          queryParams: {
            start: start.format(),
            end: end.format(),
          }
        });
      }
    },
  },
});

function toUTCDate(date) {
  return moment.utc(date.format('YYYY-MM-DD'));
}
