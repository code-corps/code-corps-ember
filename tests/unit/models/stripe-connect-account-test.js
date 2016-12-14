import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('stripe-connect-account', 'Unit | Model | stripe connect account', {
  needs: ['model:organization']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('stripe-connect-account', [
  'email', 'recipientType', 'firstName', 'lastName', 'dobDay', 'dobMonth', 'dobYear',
  'address1', 'address2', 'city', 'country', 'state', 'zip', 'ssnLast4',
  'businessEin', 'businessName', 'businessType',
  'canAcceptDonations', 'chargesEnabled',
  'displayName', 'idFromStripe',
  'insertedAt', 'updatedAt'
]);
testForBelongsTo('stripe-connect-account', 'organization');
