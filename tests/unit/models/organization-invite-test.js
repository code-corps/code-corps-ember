import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';
import 'code-corps-ember/tests/helpers/has-attributes';

moduleForModel('organization-invite', 'Unit | Model | organization invite', {
  needs: ['model:organization']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('organizationInvite', [
  'email',
  'organizationName'
]);
testForBelongsTo('organizationInvite', 'organization');
