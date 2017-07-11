import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import '../../helpers/has-attributes';

moduleForModel('project-github-repo', 'Unit | Model | project-github-repo', {
  // Specify the other units that are required for this test.
  needs: [
    'model:github-repo',
    'model:project'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('project-github-repo', [
  'insertedAt',
  'updatedAt'
]);

testForBelongsTo('project-github-repo', 'githubRepo');
testForBelongsTo('project-github-repo', 'project');
