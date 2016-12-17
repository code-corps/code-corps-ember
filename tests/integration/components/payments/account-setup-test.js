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
  onRecipientDetailsSubmitted = K,
  onVerificationDocumentSubmitted = K,
  onPersonalIdNumberSubmitted = K,
  onBankAccountInformationSubmitted = K
} = {}) {
  context.setProperties({
    onRecipientDetailsSubmitted,
    onVerificationDocumentSubmitted,
    onPersonalIdNumberSubmitted,
    onBankAccountInformationSubmitted
  });
}

function renderPage() {
  page.render(hbs`
    {{payments/account-setup
      account=account
      email=email
      isBusy=isBusy
      onRecipientDetailsSubmitted=onRecipientDetailsSubmitted
      onVerificationDocumentSubmitted=onVerificationDocumentSubmitted
      onPersonalIdNumberSubmitted=onPersonalIdNumberSubmitted
      onBankAccountInformationSubmitted=onBankAccountInformationSubmitted
      organizationName=project.organization.name
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

test('it renders all subcomponents', function(assert) {
  assert.expect(2);
  renderPage();

  assert.ok(page.rendersFundsRecipient, 'Funds recipient subpcomponent is rendered.');
  assert.ok(page.rendersBankAccount, 'Bank account subcomponent is rendered.');
});

// TODO: Write tests, remove 'it renders' test

