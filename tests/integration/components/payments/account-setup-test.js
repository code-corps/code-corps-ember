import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import accountSetupComponent from '../../../pages/components/payments/account-setup';

const {
  K
} = Ember;

let page = PageObject.create(accountSetupComponent);

function setHandlers(context, {
  onCreateStripeConnectAccount = K,
  onRecipientDetailsSubmitted = K,
  onVerificationDocumentSubmitted = K,
  onLegalEntityPersonalIdNumberSubmitted = K,
  onBankAccountInformationSubmitted = K
} = {}) {
  context.setProperties({
    onCreateStripeConnectAccount,
    onRecipientDetailsSubmitted,
    onVerificationDocumentSubmitted,
    onLegalEntityPersonalIdNumberSubmitted,
    onBankAccountInformationSubmitted
  });
}

function renderPage() {
  page.render(hbs`
    {{payments/account-setup
      isBusy=isBusy
      onBankAccountInformationSubmitted=onBankAccountInformationSubmitted
      onCreateStripeConnectAccount=onCreateStripeConnectAccount
      onLegalEntityPersonalIdNumberSubmitted=onLegalEntityPersonalIdNumberSubmitted
      onRecipientDetailsSubmitted=onRecipientDetailsSubmitted
      onVerificationDocumentSubmitted=onVerificationDocumentSubmitted
      organizationName=project.organization.name
      stripeConnectAccount=stripeConnectAccount
    }}
  `);
}

moduleForComponent('payments/account-setup', 'Integration | Component | payments/account setup', {
  integration: true,
  beforeEach() {
    setHandlers(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it works properly when account needs to be created', function(assert) {
  assert.expect(3);

  // account needs to be created if it doesn't exist
  this.set('stripeConnectAccount', null);

  // ensure correct action is called on submit
  function onCreateStripeConnectAccount({ country, tosAcceptanceDate }) {
    assert.equal(country, 'US', 'Country is preset to "US".');
    assert.ok(tosAcceptanceDate, 'Acceptance date is set.');
  }

  setHandlers(this, { onCreateStripeConnectAccount });
  renderPage();

  // ensure correct component is rendered
  assert.ok(page.rendersCreateAccount, 'Create account form is rendered');
  page.createAccount.clickSubmit();
});

test('it works properly when account needs fund recipient information', function(assert) {
  assert.expect(3);

  // account needs to be created if it doesn't exist
  this.set('stripeConnectAccount', { recipientStatus: 'required' });

  // ensure correct action is called on submit
  function onRecipientDetailsSubmitted() {
    assert.ok(true, 'Action gets called.');
  }

  setHandlers(this, { onRecipientDetailsSubmitted });
  renderPage();

  assert.ok(page.rendersFundsRecipientRequired, 'Funds recipient component is rendered.');
  assert.ok(page.fundsRecipient.rendersDetailsFormRequired, 'Funds recipient details subcomponent is rendered.');

  page.fundsRecipient.detailsForm.clickSubmit();
});

test('it works properly when account needs a document', function(assert) {
  assert.expect(3);

  // account needs to be created if it doesn't exist
  this.set('stripeConnectAccount', { recipientStatus: 'verifying', verificationDocumentStatus: 'required' });

  // ensure correct action is called on submit
  function onVerificationDocumentSubmitted(fileId) {
    assert.equal(fileId, 'testFile', 'Action gets called with proper file id.');
  }

  setHandlers(this, { onVerificationDocumentSubmitted });
  renderPage();

  assert.ok(page.rendersFundsRecipientVerifying, 'Funds recipient component is rendered in verifying state.');
  assert.ok(page.fundsRecipient.rendersVerificationDocumentRequired, 'Document form is rendered.');

  // need to figure out how to trigger upload
  page.fundsRecipient.verificationDocument.triggerDocumentSubmitted(this, 'testFile');
});

test('it works properly when account needs personal id information', function(assert) {
  assert.expect(3);

  // account needs to be created if it doesn't exist
  this.set('stripeConnectAccount', {
    recipientStatus: 'verifying',
    verificationDocumentStatus: 'verified',
    personalIdNumberStatus: 'required'
  });

  // ensure correct action is called on submit
  function onLegalEntityPersonalIdNumberSubmitted(number) {
    assert.equal(number, '1234', 'Action gets called with proper id number.');
  }

  setHandlers(this, { onLegalEntityPersonalIdNumberSubmitted });
  renderPage();

  assert.ok(page.rendersFundsRecipientVerifying, 'Funds recipinet component is rendered in verifying state.');
  assert.ok(page.fundsRecipient.rendersLegalEntityPersonalIdNumberRequired, 'Personal id number subcomponent is rendered in required state.');

  page.fundsRecipient
      .legalEntityPersonalIdNumber
      .legalEntityPersonalIdNumber('1234')
      .clickSubmit();
});

test('it works properly when account needs bank account information', function(assert) {
  assert.expect(4);

  // account needs to be created if it doesn't exist
  this.set('stripeConnectAccount', {
    recipientStatus: 'verified',
    verificationDocumentStatus: 'verified',
    personalIdNumberStatus: 'verified',
    bankAccountStatus: 'required'
  });

  // ensure correct action is called on submit
  function onBankAccountInformationSubmitted({ accountNumber, routingNumber }) {
    assert.equal(accountNumber, '1234', 'Action gets called with proper account number.');
    assert.equal(routingNumber, '4321', 'Action gets called with proper routing number.');
  }

  setHandlers(this, { onBankAccountInformationSubmitted });
  renderPage();

  assert.ok(page.rendersFundsRecipientVerified, 'Funds recipient component is rendered in verified state.');
  assert.ok(page.rendersBankAccountRequired, 'Bank account component is rendered in required state.');

  page.bankAccount
      .accountNumber('1234')
      .routingNumber('4321')
      .clickSubmit();
});

test('it works properly when account is fully verified', function(assert) {
  assert.expect(2);

  // account needs to be created if it doesn't exist
  this.set('stripeConnectAccount', {
    recipientStatus: 'verified',
    verificationDocumentStatus: 'verified',
    personalIdNumberStatus: 'verified',
    bankAccountStatus: 'verified'
  });

  renderPage();

  assert.ok(page.rendersFundsRecipientVerified, 'Funds recipient component is rendered in verified state.');
  assert.ok(page.rendersBankAccountVerified, 'Bank account component is rendered in verified state.');
});
