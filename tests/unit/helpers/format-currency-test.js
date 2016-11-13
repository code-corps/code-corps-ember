import { module, test } from 'qunit';
import { formatCurrency } from 'code-corps-ember/helpers/format-currency';

module('Unit | Helper | format-currency');

test('formats hundreds correctly', function(assert) {
  assert.expect(1);

  let result = formatCurrency([123.00]);
  assert.equal(result, '$123.00');
});

test('formats thousands correctly', function(assert) {
  assert.expect(1);

  let result = formatCurrency([12345]);
  assert.equal(result, '$12,345.00');
});

test('formats millions correctly', function(assert) {
  assert.expect(1);

  let result = formatCurrency([234567890.55]);
  assert.equal(result, '$234,567,890.55');
});

test('formats empty values correctly', function(assert) {
  assert.expect(1);

  let result = formatCurrency([null]);
  assert.equal(result, '');
});

test('trims zeros away if specified', function(assert) {
  assert.expect(1);

  let result = formatCurrency([20.00], { trimZero: true });
  assert.equal(result, '$20');
});
