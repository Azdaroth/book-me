import DS from 'ember-data';
import Ember from 'ember';

const {
  Model,
  attr,
  belongsTo,
} = DS;

const {
  get,
  computed,
} = Ember;

export default Model.extend({
  beginsAt: attr('moment-utc'),
  finishesAt: attr('moment-utc'),
  clientEmail: attr('string'),
  price: attr('number'),

  rental: belongsTo('rental'),

  lengthOfStay: computed('beginsAt', 'finishesAt', function() {
    const beginsAt = get(this, 'beginsAt').clone();
    const finishesAt = get(this, 'finishesAt').clone();

    return finishesAt.set({ hour: 0 }).diff(beginsAt.set({ hour: 0 }), 'days');
  }),
});
