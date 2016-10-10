import { highlightSubstrings } from 'code-corps-ember/helpers/highlight-substrings';
import { module, test } from 'qunit';

module('Unit | Helper | highlight substrings');

test('it replaces searched strings with strong tags', function(assert) {
  assert.expect(1);

  let string = 'Apache HTTP Server';
  let query = 'ht tt tp';
  let expectedOutput = 'Apache <strong>HT</strong><strong>TP</strong> Server';

  assert.equal(highlightSubstrings([string, query]), expectedOutput);
});
