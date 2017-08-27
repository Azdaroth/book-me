import resolveDelay from 'book-me/utilities/resolve-delay';
import { module, test } from 'qunit';

module('Unit | Utility | resolve delay');

test('it returns 0 for every value in test env', function(assert) {
  assert.equal(resolveDelay(42), 0);
  assert.equal(resolveDelay(0), 0);
  assert.equal(resolveDelay(3000), 0);
});

