/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'book-me/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';
import { authenticateSession, } from 'book-me/tests/helpers/ember-simple-auth';
import page from 'book-me/tests/pages/rentals';
import Mirage from 'ember-cli-mirage';

const {
  Response,
} = Mirage;

moduleForAcceptance('Acceptance | rentals crud', {
  beforeEach() {
    const user = server.create('user');
    authenticateSession(this.application, { user_id: user.id });
  },
});

test('it is possible to read, create, edit and delete rentals', function(assert) {
  assert.expect(7);

  page.visitAdmin();

  andThen(() => {
    assert.notOk(find(testSelector('rental-row')).length, 'no rentals should be visible');
  });

  const name = 'Rental 1';
  const dailyRate = 100;

  server.post('/rentals', function(schema) {
    const attributes = this.normalizedRequestAttrs();
    const expectedAttributes = { name, dailyRate };

    assert.deepEqual(attributes, expectedAttributes, "attributes don't match the expected ones");

    return schema.rentals.create(attributes);
  });

  page
    .goToNewRental()
    .rentalName(name)
    .rentalDailyRate(dailyRate)
    .createRental();

  andThen(() => {
    assert.ok(find(testSelector('rental-row')).length, 'a new rental should be visible');
  });

  const updatedDailyRate = 200;

  server.patch('/rentals/:id', function({ rentals }, request) {
    const id = request.params.id;
    const attributes = this.normalizedRequestAttrs();
    const expectedAttributes = { id, name, dailyRate: updatedDailyRate };

    assert.deepEqual(attributes, expectedAttributes, "attributes don't match the expected ones");

    return rentals.find(id).update(attributes);
  });

  page
    .goToEditRental()
    .rentalDailyRate(updatedDailyRate)
    .updateRental();

  andThen(() => {
    assert.equal(currentPath(), 'admin', 'user should be redirected to admin page');
  });

  server.del('/rentals/:id', function({ rentals }, request) {
    const id = request.params.id;

    assert.ok(true, 'rental should be destroyed')

    rentals.find(id).destroy();
  });

  page.deleteRental();

  andThen(() => {
    assert.notOk(find(testSelector('rental-row')).length, 'no rentals should be visible');
  });
});


test('it displays server-side validation errors when creating new rental', function(assert) {
  assert.expect(2);

  server.post('/rentals', () => {
    const errors = {
      errors: [
        {
          detail: 'is already taken',
          source: {
            pointer: 'data/attributes/name'
          }
        }
      ]
    };
    return new Response(422, {}, errors);
  });

  page
    .visitAdmin()
    .goToNewRental()
    .rentalName('name')
    .rentalDailyRate(100)
    .createRental();

  andThen(() => {
    assert.equal(currentPath(), 'rentals.new', 'user should stay on new rental page');
    assert.ok(find(testSelector('rental-errors')).length, 'errors should be visible when submitting form with invalid data');
  });
});

test('it displays server-side validation errors when updating rental', function(assert) {
  assert.expect(2);

  server.create('rental', { name: 'name', dailyRate: 20 });

  server.patch('/rentals/:id', () => {
    const errors = {
      errors: [
        {
          detail: 'is already taken',
          source: {
            pointer: 'data/attributes/name'
          }
        }
      ]
    };
    return new Response(422, {}, errors);
  });

  page
    .visitAdmin()
    .goToEditRental()
    .rentalName('updated name')
    .rentalDailyRate(100)
    .updateRental();

  andThen(() => {
    assert.equal(currentPath(), 'rental.edit', 'user should stay on edit rental page');
    assert.ok(find(testSelector('rental-errors')).length, 'errors should be visible when submitting form with invalid data');
  });
});
