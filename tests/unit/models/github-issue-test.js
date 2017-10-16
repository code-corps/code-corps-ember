import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import '../../helpers/has-attributes';

moduleForModel('github-issue', 'Unit | Model | github-issue', {
  // Specify the other units that are required for this test.
  needs: [
    'model:github-repo'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('github-issue', [
  'body',
  'closedAt',
  'commentsUrl',
  'eventsUrl',
  'githubCreatedAt',
  'githubId',
  'githubUpdatedAt',
  'htmlUrl',
  'labelsUrl',
  'locked',
  'number',
  'state',
  'title',
  'url'
]);

testForBelongsTo('github-issue', 'githubRepo');
