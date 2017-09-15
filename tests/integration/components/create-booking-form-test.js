import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import testSelector from 'ember-test-selectors';
import moment from 'moment';

const {
  set,
} = Ember;

moduleForComponent('create-booking-form', 'Integration | Component | create booking form', {
  integration: true
});

test('submitting form fires onCreateBooking action with booking as argument', function(assert) {
  assert.expect(1);

  const {
    $,
  } = this;
  const bookingStub = Ember.Object.create({
    beginsAt: moment.utc('2017-10-01 14:00:00'),
    finishesAt: moment.utc('2017-10-10 10:00:00'),
    price: 100,
  });
  const onCreateBooking = (argument) => {
    assert.deepEqual(argument._content, bookingStub, 'onCreateBooking should be called with booking changeset');
  };

  set(this, 'booking', bookingStub);
  set(this, 'rentalBookings', []);
  set(this, 'onCreateBooking', onCreateBooking)

  this.render(hbs`{{create-booking-form booking=booking onCreateBooking=onCreateBooking rentalBookings=rentalBookings}}`);

  $(testSelector('booking-client-email')).val('client@example.com').change();

  $(testSelector('create-booking')).click();
});

test('clicking cancel button fires onCancelCreation action with booking as argument', function(assert) {
  assert.expect(1);

  const {
    $,
  } = this;
  const bookingStub = Ember.Object.create();
  const onCancelCreation = (argument) => {
    assert.deepEqual(argument, bookingStub, 'onCancelCreation should be called with booking');
  };

  set(this, 'booking', bookingStub);
  set(this, 'onCancelCreation', onCancelCreation)

  this.render(hbs`{{create-booking-form booking=booking onCancelCreation=onCancelCreation}}`);

  $(testSelector('cancel-creation')).click();
});

test('it displays validation error when the data is invalid', function(assert) {
  assert.expect(2);

  const {
    $,
  } = this;
  const bookingStub = Ember.Object.create();

  set(this, 'booking', bookingStub);
  set(this, 'rentalBookings', []);
  set(this, 'onCreateBooking', () => {
    throw new Error('action should not be called');
  });

  this.render(hbs`{{create-booking-form booking=booking onCreateBooking=onCreateBooking rentalBookings=rentalBookings}}`);

  assert.notOk($(testSelector('booking-errors')).length, 'errors should not initially be visible')

  $(testSelector('create-booking')).click();

  assert.ok($(testSelector('booking-errors')).length, 'errors should be visible when submitting form with invalid data');
});
