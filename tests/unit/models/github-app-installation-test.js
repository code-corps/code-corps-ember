import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import '../../helpers/has-attributes';

moduleForModel('github-app-installation', 'Unit | Model | github-app-installation', {
  // Specify the other units that are required for this test.
  needs: [
    'model:github-repo',
    'model:organization-github-app-installation',
    'model:project',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('github-app-installation', [
  'githubId',
  'insertedAt',
  'installed',
  'state',
  'updatedAt'
]);

testForHasMany('github-app-installation', 'organizationGithubAppInstallations');
testForBelongsTo('github-app-installation', 'project');
testForBelongsTo('github-app-installation', 'user');
testForHasMany('github-app-installation', 'githubRepos');
