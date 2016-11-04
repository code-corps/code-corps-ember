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
  assert.expect(2);

  this.set('amount', 22.500);

  page.render(hbs`{{donations/show-donation amount=amount}}`);

  assert.ok(page.rendersIcon, 'Icon is rendered.');
  assert.equal(page.infoText, 'You pledged $22.50 each month.', 'Proper text is rendered.');
});
