import { range } from 'code-corps-ember/utils/array-utils';
import { module, test } from 'qunit';

module('Unit | Utility | array-utils');

test('range returns an array of integers defined by parameters', function(assert) {
  assert.deepEqual(range(1, 1), [1]);
  assert.deepEqual(range(1, 2), [1, 2]);
  assert.deepEqual(range(1, 5), [1, 2, 3, 4, 5]);
});
