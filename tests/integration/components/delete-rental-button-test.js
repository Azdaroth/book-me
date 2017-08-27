import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import testSelector from 'ember-test-selectors';
import wait from 'ember-test-helpers/wait';

const {
  set,
  RSVP,
} = Ember;

moduleForComponent('delete-rental-button', 'Integration | Component | delete rental button', {
  integration: true
});

test('it deletes rental by holding a button', function(assert) {
  assert.expect(2);

  const {
    $,
  } = this;

  const notifyStub = Ember.Service.extend({
    info() {
      assert.ok(true, 'notification should be displayed');
    },
  });

  this.register('service:notify', notifyStub);
  this.inject.service('notify');

  const rentalStub = Ember.Object.extend({
    destroyRecord() {
      assert.ok(true, 'item should be destoyed');

      return RSVP.resolve(this);
    },
  }).create({ id: 1 });

  set(this, 'rental', rentalStub);

  this.render(hbs`{{delete-rental-button rental=rental}}`);

  const $deleteBtn = $(testSelector('delete-rental'));
  const done = assert.async();

  $deleteBtn.mousedown();

  wait().then(() => {
    done();
  });
});
