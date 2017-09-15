/* global server */
import { test } from 'qunit';
import moduleForAcceptance from 'book-me/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';
import { authenticateSession, } from 'book-me/tests/helpers/ember-simple-auth';
import page from 'book-me/tests/pages/create-booking';
import moment from 'moment';

moduleForAcceptance('Acceptance | create booking', {
  beforeEach() {
    const user = server.create('user');
    authenticateSession(this.application, { user_id: user.id });
  },
});

test('creating a booking for rental', function(assert) {
  assert.expect(4);

  const dailyRate = 100;
  const rental = server.create('rental', { dailyRate });
  const clientEmail = 'client@email.com';
  const today = moment();
  const currentMonth = today.month() + 1; // month are indexed starting from 0
  const startDay = 10;
  const endDay = 20;
  const price = (endDay - startDay) * dailyRate;

  page
    .visitAdmin()
    .goToRentalPage();

  andThen(() => {
    assert.notOk(find(testSelector('booking-row')).length, 'no bookings should be visible');
  });

  server.post('/bookings', function(schema) {
    const attributes = this.normalizedRequestAttrs();
    const expectedAttributes = {
      rentalId: rental.id,
      clientEmail,
      price,
      beginsAt: `2017-0${currentMonth}-${startDay}T14:00:00.000Z`,
      finishesAt: `2017-0${currentMonth}-${endDay}T10:00:00.000Z`,
    };

    assert.deepEqual(attributes, expectedAttributes, "attributes don't match the expected ones");

    return schema.rentals.create(attributes);
  });

  page
    .selectStartDate(startDay)
    .selectEndDate(endDay)
    .fillInClientEmail(clientEmail)
    .createNewBooking();

  andThen(() => {
    assert.ok(find(testSelector('booking-row')).length, 'bookings should be visible');
    assert.equal(currentURL(), `/rentals/${rental.id}/show`, 'should transition back to rental/show route');
  });
});
