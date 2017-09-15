import {
  create,
  clickable,
  fillable,
  visitable,
  clickOnText,
} from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';

export default create({
  visitAdmin: visitable('/admin'),
  goToRentalPage: clickable(testSelector('show-rental')),
  selectStartDate: clickOnText('button', { scope: testSelector('new-booking-calendar') }),
  selectEndDate: clickOnText('button', { scope: testSelector('new-booking-calendar') }),
  fillInClientEmail: fillable(testSelector('booking-client-email')),
  createNewBooking: clickable(testSelector('create-booking')),
});
