import { module, test } from 'qunit';
import validateRental from 'book-me/validators/rental';

module('Unit | Validator | rental');

test('it validates presence of name', function(assert) {
  assert.equal(validateRental.name('name', ''), "Name can't be blank");
  assert.ok(validateRental.name('name', 'Rental 1'));
});

test('it validates if dailyRate is an integer greater than 0', function(assert) {
  assert.equal(validateRental.dailyRate('dailyRate', null), 'Daily rate must be a number');
  assert.equal(validateRental.dailyRate('dailyRate', 123.12), 'Daily rate must be an integer');
  assert.ok(validateRental.dailyRate('dailyRate', 100));
});
