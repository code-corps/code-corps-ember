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
  'address1',
  'address2',
  'businessEin',
  'businessName',
  'businessType',
  'canAcceptDonations',
  'chargesEnabled',
  'city',
  'country',
  'displayName',
  'dobDay',
  'dobMonth',
  'dobYear',
  'email',
  'firstName',
  'identityDocumentId',
  'idFromStripe',
  'insertedAt',
  'lastName',
  'recipientStatus',
  'recipientType',
  'ssnLast4',
  'state',
  'updatedAt',
  'verificationDocumentStatus',
  'verificationFieldsNeeded',
  'zip'
]);
testForBelongsTo('stripe-connect-account', 'organization');
