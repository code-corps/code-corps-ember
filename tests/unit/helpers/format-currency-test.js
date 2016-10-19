import { module, test } from 'qunit';
import { formatCurrency } from 'code-corps-ember/helpers/format-currency';

module('Unit | Helper | format-currency');

test('formats hundreds correctly', function(assert) {
  assert.expect(1);

  let result = formatCurrency([123]);
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
