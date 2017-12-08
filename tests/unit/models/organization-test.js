import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import '../../helpers/has-attributes';

moduleForModel('organization', 'Unit | Model | organization', {
  // Specify the other units that are required for this test.
  needs: [
    'model:project',
    'model:stripe-connect-account',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('organization', [
  'approved',
  'cloudinaryPublicId',
  'description',
  'iconLargeUrl',
  'iconThumbUrl',
  'inviteCode',
  'name',
  'slug'
]);

testForBelongsTo('organization', 'stripeConnectAccount');
testForBelongsTo('organization', 'owner');
testForHasMany('organization', 'projects');
