import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('stripe-account', 'Unit | Model | stripe account', {
  // Specify the other units that are required for this test.
  needs: [
    'model:organization'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('stripe-account', ['businessName', 'businessUrl', 'chargesEnabled', 'displayName', 'email', 'idFromStripe', 'insertedAt', 'updatedAt']);
testForBelongsTo('stripe-account', 'organization');
