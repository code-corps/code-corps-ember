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
  onRecipientInformationSubmittedHandler = K,
  onBankAccountInformationSubmittedHandler = K
} = {}) {
  context.setProperties({
    onRecipientInformationSubmittedHandler,
    onBankAccountInformationSubmittedHandler
  });
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

test('it renders', function(assert) {
  page.render(hbs`
    {{payments/account-setup
      onRecipientInformationSubmitted=onRecipientInformationSubmittedHandler
      onBankAccountInformationSubmitted=onBankAccountInformationSubmittedHandler}}
  `);
  assert.equal(this.$('.account-setup').length, 1, 'Component renders');
});

// TODO: Write tests, remove 'it renders' test
//
// test('it renders correctly for individual', function(assert) {
//   assert.expect(0);

//   page.render(hbs`{{payments/account-setup accountInformationSubmitted=submitHandler}}`);
// });

// test('it renders correctly for business', function(assert) {
//   assert.expect(0);

//   page.render(hbs`{{payments/account-setup accountInformationSubmitted=submitHandler}}`);
// });

// test('it submits correctly for individual', function(assert) {
//   assert.expect(0);

//   page.render(hbs`{{payments/account-setup accountInformationSubmitted=submitHandler}}`);
// });

// test('it submits correctly for business', function(assert) {
//   assert.expect(0);

//   page.render(hbs`{{payments/account-setup accountInformationSubmitted=submitHandler}}`);
// });
