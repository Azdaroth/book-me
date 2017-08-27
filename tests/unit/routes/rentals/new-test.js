import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import Changeset from 'ember-changeset';

const {
  get,
  RSVP,
  run,
  computed,
} = Ember

moduleFor('route:rentals/new', 'Unit | Route | rentals/new', {
  needs: ['service:session'],
});

test('it requires authentication', function(assert) {
  assert.expect(1);

  const sessionStub = Ember.Service.extend({
    isAuthenticated: computed(() => {
      assert.ok(true, 'isAuthenticated has to be used for checking authentication');

      return true;
    }),
  });

  this.register('service:session', sessionStub);
  this.inject.service('session');

  const route = this.subject();

  route.beforeModel();
});

test('changeset gets populated with model errors in `createRental` action when there is an error on backend', function(assert) {
  assert.expect(2)

  const route = this.subject();
  const createRental = route.actions.createRental;

  const errors = [
    {
      attribute: 'name',
      message: 'is invalid',
    }
  ];
  const rentalStub = Ember.Object.extend({
    save() {
      return RSVP.reject();
    },
  }).create({ errors });
  const changeset = new Changeset(rentalStub);

  run(createRental.bind(route, changeset));

  assert.ok(get(changeset, 'isInvalid'), 'changeset should be invalid');

  const expectedErrors = [
    {
      key: 'name',
      validation: 'name is invalid',
    }
  ];
  assert.deepEqual(get(changeset, 'errors'), expectedErrors, 'changeset should be populated with errors');
});
