import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import bankAccountComponent from '../../../pages/components/payments/bank-account';

const { K } = Ember;

let page = PageObject.create(bankAccountComponent);

function setHandler(context, bankAccountInformationSubmittedHandler = K) {
  context.set(
    'bankAccountInformationSubmittedHandler',
    bankAccountInformationSubmittedHandler
  );
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

test('it renders', function(assert) {
  page.render(hbs`{{payments/bank-account bankAccountInformationSubmitted=bankAccountInformationSubmittedHandler}}`);
  assert.equal(this.$('.bank-account').length, 1, 'Component renders');
});

// TODO: Write tests, remove 'it renders' test

// test('it sends out bank account parameters on submit')
