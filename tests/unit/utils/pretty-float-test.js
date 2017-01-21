import prettyFloat from 'code-corps-ember/utils/pretty-float';
import { module, test } from 'qunit';

module('Unit | Utility | pretty float');

test('it displays string containing a floating point as a number, rounded to two decimals', function(assert) {
  assert.equal(prettyFloat('22.25'), 22.25);
  assert.equal(prettyFloat('22.252'), 22.25);
  assert.equal(prettyFloat('22.256'), 22.26);
  assert.equal(prettyFloat('22.00'), 22.00);
  assert.equal(prettyFloat('22.000'), 22.00);
});

test('it rounds number to two decimals by default', function(assert) {
  assert.equal(prettyFloat(22.25), 22.25);
  assert.equal(prettyFloat(22.252), 22.25);
  assert.equal(prettyFloat(22.256), 22.26);
  assert.equal(prettyFloat(22.2562), 22.26);
  assert.equal(prettyFloat(22.2567), 22.26);
  assert.equal(prettyFloat(22.00), 22.00);
  assert.equal(prettyFloat(22.000), 22.00);
  assert.equal(prettyFloat(22), 22.00);
});

test('it rounds number to requested number of decimals if specified', function(assert) {
  assert.equal(prettyFloat(22.25, { numDecimals: 3 }), 22.250);
  assert.equal(prettyFloat(22.252, { numDecimals: 3 }), 22.252);
  assert.equal(prettyFloat(22.256, { numDecimals: 3 }), 22.256);
  assert.equal(prettyFloat(22.2562, { numDecimals: 3 }), 22.256);
  assert.equal(prettyFloat(22.2567, { numDecimals: 3 }), 22.257);
  assert.equal(prettyFloat(22.00, { numDecimals: 3 }), 22.000);
  assert.equal(prettyFloat(22.000, { numDecimals: 3 }), 22.000);
  assert.equal(prettyFloat(22, { numDecimals: 3 }), 22.000);
});

test('if the decimals after rounding are zero, it trims them off if asked', function(assert) {
  assert.equal(prettyFloat('22.00', true), 22);
  assert.equal(prettyFloat('22.000', true), 22);
  assert.equal(prettyFloat(22.00, true), 22);
  assert.equal(prettyFloat(22.000, true), 22);
  assert.equal(prettyFloat(22, true), 22);
  assert.equal(prettyFloat(22.006, true), 22.01, 'Number after rounding is not integer, so decimals are not trimmed, even though asked');
});

test('if the provided value is not a number, it returns an empty string', function(assert) {
  assert.equal(prettyFloat('abc'), '');
  assert.equal(prettyFloat(''), '');
  assert.equal(prettyFloat(null), '');
  assert.equal(prettyFloat(undefined), '');
});
