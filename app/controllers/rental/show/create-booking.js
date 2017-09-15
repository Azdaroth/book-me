import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['start', 'end'],
  start: null,
  end: null,
});
