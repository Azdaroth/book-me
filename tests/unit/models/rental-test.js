import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

const {
  get,
} = Ember;

moduleForModel('rental', 'Unit | Model | rental', {
});

test('defaultArrivalHour returns 14', function(assert) {
  const model = this.subject();

  assert.equal(get(model, 'defaultArrivalHour'), 14);
});


test('defaultDepartureHour returns 10', function(assert) {
  const model = this.subject();

  assert.equal(get(model, 'defaultDepartureHour'), 10);
});
