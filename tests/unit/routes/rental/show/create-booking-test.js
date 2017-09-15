import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const {
  RSVP,
  run,
  computed,
} = Ember;

moduleFor('route:rental/show/create-booking', 'Unit | Route | rental/show/create booking', {
  needs: ['service:session'],
});

test("closeModal action deletes booking record, resets calendar's range and peforms transition to `rental/show` route", function(assert) {
  assert.expect(4);

  const route = this.subject();

  const controllerStub = Ember.Object.extend({
    resetRange() {
      assert.ok(true, 'resetRange should be called');
    },
  }).create();
  const rentalStub = Ember.Object.create();
  const bookingStub = Ember.Object.extend({
    deleteRecord() {
      assert.ok(true, 'deleteRecord should be called');
      return RSVP.resolve(this);
    },
  }).create();

  route.controllerFor = (name) => {
    if (name === 'rental.show') {
      return controllerStub;
    }
  };
  route.modelFor = (name) => {
    if (name === 'rental') {
      return rentalStub;
    }
  };
  route.transitionTo = (routeName, rentalArgument) => {
    assert.equal(routeName, 'rental.show', 'should transition to rental.show route');
    assert.deepEqual(rentalArgument, rentalStub, 'should be called with proper argument');
  };

  route.actions.closeModal.bind(route)(bookingStub);
});

test("createBooking action creates booking, resets calendar's range and peforms transition to `rental/show` route", function(assert) {
  assert.expect(4);

  const route = this.subject();

  const controllerStub = Ember.Object.extend({
    resetRange() {
      assert.ok(true, 'resetRange should be called');
    },
  }).create();
  const rentalStub = Ember.Object.create();
  const bookingStub = Ember.Object.extend({
    save() {
      assert.ok(true, 'save should be called');
      return RSVP.resolve();
    },
  }).create();

  route.controllerFor = (name) => {
    if (name === 'rental.show') {
      return controllerStub;
    }
  };
  route.modelFor = (name) => {
    if (name === 'rental') {
      return rentalStub;
    }
  };
  route.transitionTo = (routeName, rentalArgument) => {
    assert.equal(routeName, 'rental.show', 'should transition to rental.show route');
    assert.deepEqual(rentalArgument, rentalStub, 'should be called with proper argument');
  };

  run(() => {
    route.actions.createBooking.bind(route)(bookingStub);
  });
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
