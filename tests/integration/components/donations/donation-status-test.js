import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import donationStatusComponent from '../../../pages/components/donations/donation-status';

let page = PageObject.create(donationStatusComponent);

function setHandler(context, createDonationHandler = function() {}) {
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

test('it renders the become a donor link initially', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/donation-status}}`);

  assert.ok(page.rendersLink, 'The link is rendered.');
});

test('it renders show-donation if a subscription record is present and assigned', function(assert) {
  assert.expect(2);

  this.set('subscription', { quantity: 1.50 });
  page.render(hbs`{{donations/donation-status subscription=subscription}}`);

  assert.ok(page.rendersShowDonation, 'show-donation subcomponent is rendered.');
  assert.equal(page.showDonation.infoText, 'You pledged $1.50 each month.', 'Info text is properly rendered. Binding is correct.');
});
