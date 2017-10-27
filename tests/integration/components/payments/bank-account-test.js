import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import bankAccountComponent from '../../../pages/components/payments/bank-account';

let page = PageObject.create(bankAccountComponent);

function setHandler(context, submitHandler = function() {}) {
  context.set('submitHandler', submitHandler);
}

function renderPage() {
  page.render(hbs`
    {{payments/bank-account
      isBusy=isBusy
      stripeConnectAccount=stripeConnectAccount
      submit=submitHandler
    }}
  `);
}

moduleForComponent('payments/bank-account', 'Integration | Component | payments/bank account', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders correctly for "pending" status', function(assert) {
  assert.expect(1);

  let stripeConnectAccount = { bankAccountStatus: 'pending_requirement' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  renderPage();

  assert.ok(page.rendersPending, 'Component is rendered in pending status.');
});

test('it renders correctly for "required" status', function(assert) {
  assert.expect(4);

  let stripeConnectAccount = { bankAccountStatus: 'required' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  renderPage();

  assert.ok(page.rendersRequired, 'Component is rendered in required mode.');
  assert.ok(page.rendersAccountNumberField, 'Renders the account number field.');
  assert.ok(page.rendersRoutingNumberField, 'Renders the routing number field.');
  assert.ok(page.rendersSubmitButton, 'Renders the submit button.');
});

test('it renders correctly for "verified" status', function(assert) {
  assert.expect(4);

  let stripeConnectAccount = {
    bankAccountBankName: 'Wells Fargo',
    bankAccountLast4: 4321,
    bankAccountRoutingNumber: 123456,
    bankAccountStatus: 'verified'
  };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  renderPage();

  assert.ok(page.rendersVerified, 'Component is rendered in verified mode.');
  assert.equal(page.bankNameText, 'Wells Fargo', 'Renders bank account name.');
  assert.equal(page.accountLast4Text, 4321, 'Renders last 4 digits of account number.');
  assert.equal(page.routingNumberText, 123456, 'Renders routing number.');
});

test('it sends properties with submit action', function(assert) {
  assert.expect(1);

  let stripeConnectAccount = { bankAccountStatus: 'required' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  let input = {
    routingNumber: '123456',
    accountNumber: '654321'
  };

  setHandler(this, ({ accountNumber, routingNumber }) => {
    assert.deepEqual({ accountNumber, routingNumber }, input, 'Correct parameters were sent out with action.');
  });

  renderPage();
  page.accountNumber(input.accountNumber)
    .routingNumber(input.routingNumber)
    .clickSubmit();
});

test('it disables controls when busy', function(assert) {
  assert.expect(3);

  let stripeConnectAccount = { bankAccountStatus: 'required' };
  set(this, 'isBusy', true);
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  renderPage();

  assert.ok(page.accountNumberFieldIsDisabled, 'Account number field is disabled when busy.');
  assert.ok(page.routingNumberFieldIsDisabled, 'Routing number field is disabled when buys.');
  assert.ok(page.submitButtonIsDisabled, 'Submit button is disabled when busy.');
});
