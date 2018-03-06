import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import legalEntityPersonalIdNumberComponent from 'code-corps-ember/tests/pages/components/payments/funds-recipient/personal-id-number';

let page = PageObject.create(legalEntityPersonalIdNumberComponent);

function setHandler(context, submitHandler = function() {}) {
  set(context, 'submitHandler', submitHandler);
}

moduleForComponent('payments/funds-recipient/personal-id-number', 'Integration | Component | payments/funds recipient/personal id number', {
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

  let stripeConnectAccount = { personalIdNumberStatus: 'pending_requirement' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  this.render(hbs`
    {{payments/funds-recipient/personal-id-number
      isBusy=isBusy
      stripeConnectAccount=stripeConnectAccount
      submit=submitHandler}}
  `);

  assert.equal(page.text, '', 'Component renders nothing at all.');
});

test('it renders correctly for "required" status', function(assert) {
  assert.expect(2);

  let stripeConnectAccount = { personalIdNumberStatus: 'required' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  this.render(hbs`
    {{payments/funds-recipient/personal-id-number
      isBusy=isBusy
      stripeConnectAccount=stripeConnectAccount
      submit=submitHandler}}
  `);

  assert.ok(page.renderslegalEntityPersonalIdNumberField, 'Component renders the account number field.');
  assert.ok(page.rendersSubmitButton, 'Component renders the submit button.');
});

test('it renders correctly for "verifying" status', function(assert) {
  assert.expect(1);

  let stripeConnectAccount = { personalIdNumberStatus: 'verifying' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  this.render(hbs`
    {{payments/funds-recipient/personal-id-number
      isBusy=isBusy
      stripeConnectAccount=stripeConnectAccount
      submit=submitHandler}}
  `);

  assert.equal(page.text, "We're verifying your ID number.");
});

test('it renders correctly for "verified" status', function(assert) {
  assert.expect(1);

  let stripeConnectAccount = { personalIdNumberStatus: 'verified' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  this.render(hbs`
    {{payments/funds-recipient/personal-id-number
      isBusy=isBusy
      stripeConnectAccount=stripeConnectAccount
      submit=submitHandler}}
  `);

  assert.equal(page.text, '', 'Component renders nothing at all.');
});

test('it sends properties with submit action', function(assert) {
  assert.expect(1);

  let stripeConnectAccount = { personalIdNumberStatus: 'required' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  let legalEntityPersonalIdNumber = '123456';

  setHandler(this, (number) => {
    assert.equal(legalEntityPersonalIdNumber, number, 'Correct parameter was sent out with action.');
  });

  this.render(hbs`
    {{payments/funds-recipient/personal-id-number
      isBusy=isBusy
      stripeConnectAccount=stripeConnectAccount
      submit=submitHandler}}
  `);

  page.legalEntityPersonalIdNumber(legalEntityPersonalIdNumber).clickSubmit();
});

test('it disables controls when busy', function(assert) {
  assert.expect(2);

  let stripeConnectAccount = { personalIdNumberStatus: 'required' };
  set(this, 'isBusy', true);
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  this.render(hbs`
    {{payments/funds-recipient/personal-id-number
      isBusy=isBusy
      stripeConnectAccount=stripeConnectAccount
      submit=submitHandler}}
  `);

  assert.ok(page.legalEntityPersonalIdNumberFieldIsDisabled, 'Personal ID number field is disabled when busy.');
  assert.ok(page.submitButtonIsDisabled, 'Submit button is disabled when busy.');
});
