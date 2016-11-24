import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import cardItemComponent from '../../../pages/components/donation/card-item';

let page = PageObject.create(cardItemComponent);

moduleForComponent('donation/card-item', 'Integration | Component | donation/card item', {
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

  this.set('card', { id: 1, brand: 'Visa', last4: 4242 });

  page.render(hbs`{{donation/card-item card=card}}`);

  assert.equal(page.cardDescription, 'Visa ending in 4242', 'Card description is correct');
});
