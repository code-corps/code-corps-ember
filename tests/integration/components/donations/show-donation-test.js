import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import showDonationComponent from '../../../pages/components/donations/show-donation';

let page = PageObject.create(showDonationComponent);

moduleForComponent('donations/show-donation', 'Integration | Component | donations/show donation', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders proper information', function(assert) {
  assert.expect(1);

  this.set('amount', 22.500);

  this.render(hbs`{{donations/show-donation amount=amount}}`);

  assert.equal(page.infoText, 'You pledged $22.50 each month.', 'Proper text is rendered.');
});
