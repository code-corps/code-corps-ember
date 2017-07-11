import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import '../../helpers/has-attributes';

moduleForModel('organization-github-app-installation', 'Unit | Model | organization-github-app-installation', {
  // Specify the other units that are required for this test.
  needs: [
    'model:github-app-installation',
    'model:organization'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('organization-github-app-installation', [
  'insertedAt',
  'updatedAt'
]);

testForBelongsTo('organization-github-app-installation', 'githubAppInstallation');
testForBelongsTo('organization-github-app-installation', 'organization');
