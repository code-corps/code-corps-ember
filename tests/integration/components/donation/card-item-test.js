import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import cardItemComponent from '../../../pages/components/donation/card-item';

let page = PageObject.create(cardItemComponent);

const {
  K
} = Ember;

let setHandler = function(context, selectHandler = K) {
  context.set('selectHandler', selectHandler);
};

moduleForComponent('donation/card-item', 'Integration | Component | donation/card item', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders proper information', function(assert) {
  assert.expect(1);
  this.set('card', { id: 1, brand: 'Visa', last4: '4242', expMonth: '01', expYear: '2022' });
  page.render(hbs`{{donation/card-item card=card select=selectHandler}}`);
  assert.equal(page.cardDescription, 'Visa ending in 4242 01/2022', 'Card description is correct');
});

test('it shows card as selected if selected', function(assert) {
  assert.expect(2);

  let ourCard = { id: 1, brand: 'Visa', last4: 4242 };
  let selectedCard = { id: 2, brand: 'Mastercard', last4: 4444 };

  this.set('card', ourCard);
  this.set('selectedCard', selectedCard);

  page.render(hbs`{{donation/card-item card=card select=selectHandler selectedCard=selectedCard}}`);
  assert.notOk(page.isSelected, 'Card is not displaying as selected.');
  this.set('selectedCard', ourCard);
  assert.ok(page.isSelected, 'Card is displaying as selected.');
});
