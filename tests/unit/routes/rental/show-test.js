import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember'

const {
  computed,
} = Ember;

moduleFor('route:rental/show', 'Unit | Route | rental/show', {
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
