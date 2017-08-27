import {
  create,
  clickable,
  fillable,
  visitable,
  triggerable,
} from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';

export default create({
  visitAdmin: visitable('/admin'),
  goToNewRental: clickable(testSelector('add-rental')),
  rentalName: fillable(testSelector('rental-name')),
  rentalDailyRate: fillable(testSelector('rental-daily-rate')),
  createRental: clickable(testSelector('create-rental')),
  goToEditRental: clickable(testSelector('edit-rental')),
  updateRental: clickable(testSelector('update-rental')),
  deleteRental: triggerable('mousedown', testSelector('delete-rental')),
});
