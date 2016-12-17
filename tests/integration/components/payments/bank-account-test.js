import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import bankAccountComponent from '../../../pages/components/payments/bank-account';

const { K } = Ember;

let page = PageObject.create(bankAccountComponent);

function setHandler(context, submitHandler = K) {
  context.set('submitHandler', submitHandler);
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

  let account = { bankAccountStatus: 'pending_requirement' };
  this.set('account', account);

  page.render(hbs`{{payments/bank-account account=account submit=submitHandler}}`);
  assert.ok(page.rendersPending, 'Component is rendered in pending status.');
});

test('it renders correctly for "required" status', function(assert) {
  assert.expect(4);

  let account = { bankAccountStatus: 'required' };
  this.set('account', account);

  page.render(hbs`{{payments/bank-account account=account submit=submitHandler}}`);
  assert.ok(page.rendersRequired, 'Component is rendered in required mode.');
  assert.ok(page.rendersAccountNumberField, 'Component renders the account number field.');
  assert.ok(page.rendersRoutingNumberField, 'Component renders the routing number field.');
  assert.ok(page.rendersSubmitButton, 'Component renders the submit button.');
});

test('it renders correctly for "verified" status', function(assert) {
  assert.expect(3);

  let account = { bankAccountLast4: 4321, bankAccountRoutingNumber: 123456, bankAccountStatus: 'verified' };
  this.set('account', account);

  page.render(hbs`{{payments/bank-account account=account submit=submitHandler}}`);
  assert.ok(page.rendersVerified, 'Component is rendered in verified mode.');
  assert.equal(page.accountLast4Text, 4321, 'Component renders last 4 digits of account number.');
  assert.equal(page.routingNumberText, 123456, 'Component renders routing number.');
});

test('it sends properties with submit action', function(assert) {
  assert.expect(1);

  let account = { bankAccountStatus: 'required' };
  this.set('account', account);

  let input = {
    routingNumber: '123456',
    accountNumber: '654321'
  };

  setHandler(this, (output) => {
    assert.deepEqual(output, input, 'Correct parameters were sent out with action.');
  });

  page.render(hbs`{{payments/bank-account account=account submit=submitHandler}}`)
      .accountNumber(input.accountNumber)
      .routingNumber(input.routingNumber)
      .clickSubmit();
});

test('it disables controls when busy', function(assert) {
  assert.expect(3);

  let account = { bankAccountStatus: 'required' };
  this.set('account', account);

  page.render(hbs`{{payments/bank-account account=account isBusy=true submit=submitHandler}}`);

  assert.ok(page.accountNumberFieldIsDisabled, 'Account number field is disabled when busy.');
  assert.ok(page.routingNumberFieldIsDisabled, 'Routing number field is disabled when buys.');
  assert.ok(page.submitButtonIsDisabled, 'Submit button is disabled when busy.');
});
