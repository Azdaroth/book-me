import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
import moment from 'moment';

const {
  get,
} = Ember;

moduleForModel('booking', 'Unit | Model | booking', {
});

test('lengthOfStay returns number of days of stay', function(assert) {
  const model = this.subject({
    beginsAt: moment.utc('2017-10-01 14:00:00'),
    finishesAt: moment.utc('2017-10-10 10:00:00')
  });

  assert.equal(get(model, 'lengthOfStay'), 9);
});
