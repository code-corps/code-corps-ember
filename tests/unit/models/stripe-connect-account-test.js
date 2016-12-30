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
  'bankAccountStatus',
  'businessName',
  'businessUrl',
  'canAcceptDonations',
  'chargesEnabled',
  'country',
  'defaultCurrency',
  'detailsSubmitted',
  'displayName',
  'email',
  'externalAccount',
  'insertedAt',
  'legalEntityAddressCity',
  'legalEntityAddressCountry',
  'legalEntityAddressLine1',
  'legalEntityAddressLine2',
  'legalEntityAddressPostalCode',
  'legalEntityAddressState',
  'legalEntityBusinessName',
  'legalEntityBusinessTaxId',
  'legalEntityBusinessTaxIdProvided',
  'legalEntityBusinessVatId',
  'legalEntityBusinessVatIdProvided',
  'legalEntityDobDay',
  'legalEntityDobMonth',
  'legalEntityDobYear',
  'legalEntityFirstName',
  'legalEntityLastName',
  'legalEntityGender',
  'legalEntityMaidenName',
  'legalEntityPersonalAddressCity',
  'legalEntityPersonalAddressCountry',
  'legalEntityPersonalAddressLine1',
  'legalEntityPersonalAddressLine2',
  'legalEntityPersonalAddressPostalCode',
  'legalEntityPersonalAddressState',
  'legalEntityPhoneNumber',
  'legalEntityPersonalIdNumber',
  'legalEntityPersonalIdNumberProvided',
  'legalEntitySsnLast4',
  'legalEntitySsnLast4Provided',
  'legalEntityType',
  'legalEntityVerificationDetails',
  'legalEntityVerificationDetailsCode',
  'legalEntityVerificationDocument',
  'legalEntityVerificationStatus',
  'idFromStripe',
  'managed',
  'personalIdNumberStatus',
  'recipientStatus',
  'supportEmail',
  'supportPhone',
  'supportUrl',
  'transfersEnabled',
  'updatedAt',
  'verificationDisabledReason',
  'verificationDocumentStatus',
  'verificationDueBy',
  'verificationFieldsNeeded'
]);
testForBelongsTo('stripe-connect-account', 'organization');
