import { module, test } from 'qunit';
import { formatPercentage } from 'code-corps-ember/helpers/format-percentage';

module('Unit | Helper | format-percentage');

test('formats to one decimals when there is more than one', function(assert) {
  assert.expect(1);
  let result = formatPercentage([45.562]);
  assert.equal(result, '45.6%');
});

test('formats to one decimal', function(assert) {
  assert.expect(1);
  let result = formatPercentage([22.3]);
  assert.equal(result, '22.3%');
});

test('displays one zero decimal if the value is an integer', function(assert) {
  assert.expect(1);
  let result = formatPercentage([22]);
  assert.equal(result, '22.0%');
});

test('displays one zero decimal if the value is a float with zero decimals', function(assert) {
  assert.expect(1);
  let result = formatPercentage([22.000]);
  assert.equal(result, '22.0%');
});

test('trims zero decimals if asked to', function(assert) {
  assert.expect(1);
  let result = formatPercentage([22.000], { trimZero: true });
  assert.equal(result, '22%');
});

test('displays invalid value as empty string', function(assert) {
  assert.expect(1);
  let result = formatPercentage([null]);
  assert.equal(result, '');
});
