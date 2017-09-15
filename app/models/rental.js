import DS from 'ember-data';
import Ember from 'ember';

const {
  Model,
  attr,
  hasMany,
} = DS;

const {
  computed,
} = Ember;

export default Model.extend({
  name: attr('string'),
  dailyRate: attr('number'),

  bookings: hasMany('booking'),

  defaultArrivalHour: computed(() => {
    return 14;
  }),

  defaultDepartureHour: computed(() => {
    return 10;
  }),
});
