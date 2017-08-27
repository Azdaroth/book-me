import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import testSelector from 'ember-test-selectors';

const {
  set,
} = Ember;

moduleForComponent('rental-persistence-form', 'Integration | Component | rental persistence form', {
  integration: true
});

test('it calls persistRental action when submitting form when the data is valid', function(assert) {
  assert.expect(1);

  const {
    $,
  } = this;
  const rental = Ember.Object.create({
    id: 1,
  });

  set(this, 'rental', rental);
  set(this, 'persistRental', (changeset) => {
    assert.deepEqual(changeset._content, rental, 'persistRental action should be called with rental changset');
  });

  this.render(hbs`
    {{#rental-persistence-form rental=rental persistRental=persistRental}}
      "<button type='submit' data-test-submit-btn>Submit</button>"
    {{/rental-persistence-form}}
  `);

  $(testSelector('rental-name')).val('Rental 1').change();
  $(testSelector('rental-daily-rate')).val(100).change();

  $(testSelector('submit-btn')).click();
});

test('it displays validation error when the data is invalid', function(assert) {
  assert.expect(2);

  const {
    $,
  } = this;
  const rental = Ember.Object.create();

  set(this, 'rental', rental);
  set(this, 'persistRental', () => {
    throw new Error('action should not be called');
  });

  this.render(hbs`
    {{#rental-persistence-form rental=rental persistRental=persistRental}}
      "<button type='submit' data-test-submit-btn>Submit</button>"
    {{/rental-persistence-form}}
  `);

  assert.notOk($(testSelector('rental-errors')).length, 'errors should not initially be visible')

  $(testSelector('submit-btn')).click();

  assert.ok($(testSelector('rental-errors')).length, 'errors should be visible when submitting form with invalid data');
});
