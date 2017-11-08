import { module, test } from 'qunit';
import { formatNumber } from 'code-corps-ember/helpers/format-number';

module('Unit | Helper | format-number');

test('formats hundreds correctly', function(assert) {
  assert.expect(1);

  let result = formatNumber([123.00]);
  assert.equal(result, '123');
});

test('formats thousands correctly', function(assert) {
  assert.expect(1);

  let result = formatNumber([12345]);
  assert.equal(result, '12,345');
});

test('formats millions correctly', function(assert) {
  assert.expect(1);

  let result = formatNumber([234567890.55], { trimZero: true });
  assert.equal(result, '234,567,890.55');
});

test('formats empty values correctly', function(assert) {
  assert.expect(1);

  let result = formatNumber([null]);
  assert.equal(result, '');
});

test('does not trim zeros away if specified', function(assert) {
  assert.expect(1);

  let result = formatNumber([20.00], { trimZero: false });
  assert.equal(result, '20.00');
});
