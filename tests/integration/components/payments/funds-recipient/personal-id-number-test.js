import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import personalIdNumberComponent from 'code-corps-ember/tests/pages/components/payments/funds-recipient/personal-id-number';

let page = PageObject.create(personalIdNumberComponent);

const {
  set,
  K
} = Ember;

function setHandler(context, submitHandler = K) {
  set(context, 'submitHandler', submitHandler);
}

function renderPage() {
  page.render(hbs`
    {{payments/funds-recipient/personal-id-number
      isBusy=isBusy
      stripeConnectAccount=stripeConnectAccount
      submit=submitHandler}}
  `);
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

  renderPage();

  assert.equal(page.text, '', 'Component renders nothing at all.');
});

test('it renders correctly for "required" status', function(assert) {
  assert.expect(2);

  let stripeConnectAccount = { personalIdNumberStatus: 'required' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  renderPage();

  assert.ok(page.rendersPersonalIdNumberField, 'Component renders the account number field.');
  assert.ok(page.rendersSubmitButton, 'Component renders the submit button.');
});

test('it renders correctly for "verifying" status', function(assert) {
  assert.expect(1);

  let stripeConnectAccount = { personalIdNumberStatus: 'verifying' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  renderPage();

  assert.equal(page.text, "We're verifying your ID number");
});

test('it renders correctly for "verified" status', function(assert) {
  assert.expect(1);

  let stripeConnectAccount = { personalIdNumberStatus: 'verified' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  renderPage();

  assert.equal(page.text, '', 'Component renders nothing at all.');
});

test('it sends properties with submit action', function(assert) {
  assert.expect(1);

  let stripeConnectAccount = { personalIdNumberStatus: 'required' };
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  let personalIdNumber = '123456';

  setHandler(this, (number) => {
    assert.equal(personalIdNumber, number, 'Correct parameter was sent out with action.');
  });

  renderPage();
  page.personalIdNumber(personalIdNumber).clickSubmit();
});

test('it disables controls when busy', function(assert) {
  assert.expect(2);

  let stripeConnectAccount = { personalIdNumberStatus: 'required' };
  set(this, 'isBusy', true);
  set(this, 'stripeConnectAccount', stripeConnectAccount);

  renderPage();

  assert.ok(page.personalIdNumberFieldIsDisabled, 'Personal ID number field is disabled when busy.');
  assert.ok(page.submitButtonIsDisabled, 'Submit button is disabled when busy.');
});
