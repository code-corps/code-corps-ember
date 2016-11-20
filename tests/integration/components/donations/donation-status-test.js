import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import donationStatusComponent from '../../../pages/components/donations/donation-status';

const {
  K
} = Ember;

let page = PageObject.create(donationStatusComponent);

function setHandler(context, createDonationHandler = K) {
  context.set('createDonationHandler', createDonationHandler);
}

moduleForComponent('donations/donation-status', 'Integration | Component | donations/donation status', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders donation-status__become-a-donor component initially', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/donation-status becomeADonor=becomeADonorHandler}}`);

  assert.ok(page.rendersBecomeADonor, 'donation-status__become-a-donor subcomponent is rendered.');
});

test('it renders donation-status__create-donation if the process has started', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/donation-status createDonation=createDonationHandler processStarted=true}}`);

  assert.ok(page.rendersCreateDonation, 'donation-status__create-donation subcomponent is rendered.');
});

test('it renders donation-status__show-donation if a subscription record is present and assigned', function(assert) {
  assert.expect(2);

  this.set('subscription', { amount: 1.500 });
  page.render(hbs`{{donations/donation-status subscription=subscription}}`);

  assert.ok(page.rendersShowDonation, 'donation-status__show-donation subcomponent is rendered.');
  assert.equal(page.showDonation.infoText, 'You pledged $1.50 each month.', 'Info text is properly rendered. Binding is correct.');
});

test('the become a donor -> set amount -> continue flow works properly', function(assert) {
  assert.expect(1);

  let createDonationHandler =  function(amount) {
    assert.equal(amount, 25, 'Handler got called, with proper amount.');
  };

  setHandler(this, createDonationHandler);

  page.render(hbs`{{donations/donation-status createDonation=createDonationHandler}}`);
  page.becomeADonor.clickButton();
  page.createDonation.setTo25.clickButton();
  page.createDonation.clickContinue();
});
