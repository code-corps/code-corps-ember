import { capitalize } from 'code-corps-ember/helpers/capitalize';
import { module, test } from 'qunit';

module('Unit | Helper | capitalize');

test('it capitalizes', function(assert) {
  let result = capitalize(['lowercase string']);
  assert.equal(result, 'Lowercase string');
});

test('it returns null when empty', function(assert) {
  let result = capitalize([null]);
  assert.equal(result, null);
});
