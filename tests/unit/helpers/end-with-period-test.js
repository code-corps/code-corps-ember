import { endWithPeriod } from 'code-corps-ember/helpers/end-with-period';
import { module, test } from 'qunit';

module('Unit | Helper | end with period');

test('it adds a period if needed', function(assert) {
  let result = endWithPeriod(['Sentence with no period']);
  assert.equal(result, 'Sentence with no period.');
});

test('it adds no period if already ends in one', function(assert) {
  let result = endWithPeriod(['Sentence with a period.']);
  assert.equal(result, 'Sentence with a period.');
});
