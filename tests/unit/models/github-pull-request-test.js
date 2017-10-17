import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import '../../helpers/has-attributes';

moduleForModel('github-pull-request', 'Unit | Model | github-pull-request', {
  // Specify the other units that are required for this test.
  needs: [
    'model:github-repo'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('github-pull-request', [
  'githubCreatedAt',
  'githubUpdatedAt',
  'htmlUrl',
  'merged',
  'number',
  'state'
]);

testForBelongsTo('github-pull-request', 'githubRepo');
