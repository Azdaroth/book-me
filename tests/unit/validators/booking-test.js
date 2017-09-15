import { module, test } from 'qunit';
import validateBooking from 'book-me/validators/booking';
import Ember from 'ember';
import moment from 'moment';

module('Unit | Validator | booking');

test('it validates presence of client email', function(assert) {
  const bookings = [];
  const validator = validateBooking(bookings);

  assert.equal(validator.clientEmail[0]('clientEmail', ''), "Client email can't be blank");

  assert.ok(validator.clientEmail[0]('clientEmail', 'example@mail.com'));
});

test('it validates format of client email', function(assert) {
  const bookings = [];
  const validator = validateBooking(bookings);

  assert.equal(validator.clientEmail[1]('clientEmail', 'example@'), 'Client email must be a valid email address');

  assert.ok(validator.clientEmail[1]('clientEmail', 'example@mail.com'));
});

test('it validates if price is an integer greater than 0', function(assert) {
  const bookings = [];
  const validator = validateBooking(bookings);

  assert.equal(validator.price('price', null), 'Price must be a number');
  assert.equal(validator.price('price', 123.12), 'Price must be an integer');

  assert.ok(validator.price('price', 100));
});

test('it validates if dates overlap with existing bookings', function(assert) {
  const bookings = [
    Ember.Object.create({
      beginsAt: moment.utc('2017-10-01 14:00:00'),
      finishesAt: moment.utc('2017-10-10 10:00:00')
    })
  ];
  const validator = validateBooking(bookings);
  const _ = null;

  let content = Ember.Object.create({
    beginsAt: moment.utc('2017-10-01 14:00:00'),
    finishesAt: moment.utc('2017-10-10 10:00:00')
  });
  assert.equal(validator.dates(_, _, _, _, content), 'Dates must not overlap with other bookings');

  content = Ember.Object.create({
    beginsAt: moment.utc('2017-10-01 10:00:00'),
    finishesAt: moment.utc('2017-10-11 10:00:00')
  });
  assert.equal(validator.dates(_, _, _, _, content), 'Dates must not overlap with other bookings');

  content = Ember.Object.create({
    beginsAt: moment.utc('2017-10-01 10:00:00'),
    finishesAt: moment.utc('2017-10-05 10:00:00')
  });
  assert.equal(validator.dates(_, _, _, _, content), 'Dates must not overlap with other bookings');

  content = Ember.Object.create({
    beginsAt: moment.utc('2017-10-02 14:00:00'),
    finishesAt: moment.utc('2017-10-09 10:00:00')
  });
  assert.equal(validator.dates(_, _, _, _, content), 'Dates must not overlap with other bookings');

  content = Ember.Object.create({
    beginsAt: moment.utc('2017-10-05 10:00:00'),
    finishesAt: moment.utc('2017-10-12 10:00:00')
  });
  assert.equal(validator.dates(_, _, _, _, content), 'Dates must not overlap with other bookings');

  content = Ember.Object.create({
    beginsAt: moment.utc('2017-10-10 10:00:00'),
    finishesAt: moment.utc('2017-10-12 10:00:00')
  });
  assert.ok(validator.dates(_, _, _, _, content));

  content = Ember.Object.create({
    beginsAt: moment.utc('2017-09-10 10:00:00'),
    finishesAt: moment.utc('2017-10-01 14:00:00')
  });
  assert.ok(validator.dates(_, _, _, _, content));

  content = Ember.Object.create({
    beginsAt: moment.utc('2017-09-10 10:00:00'),
    finishesAt: moment.utc('2017-10-01 13:00:00')
  });
  assert.ok(validator.dates(_, _, _, _, content));

  content = Ember.Object.create({
    beginsAt: moment.utc('2017-10-10 11:00:00'),
    finishesAt: moment.utc('2017-10-15 10:00:00')
  });
  assert.ok(validator.dates(_, _, _, _, content));
});
