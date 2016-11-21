
import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import cardListComponent from '../../../pages/components/donation/card-list';

let page = PageObject.create(cardListComponent);

const {
  Object,
  K
} = Ember;

let setHandlers = function(context, selectCardHandler = K) {
  context.set('selectCardHandler', selectCardHandler);
};

moduleForComponent('donation/card-list', 'Integration | Component | donation/card list', {
  integration: true,
  beforeEach() {
    setHandlers(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders proper information', function(assert) {
  assert.expect(3);

  this.set('cards', [
    { id: 1, brand: 'Visa', last4: '4242' },
    { id: 2, brand: 'Diners', last4: '9999' }
  ]);

  page.render(hbs`{{donation/card-list cards=cards donate=donateHandler selectCard=selectCardHandler}}`);

  assert.equal(page.cards().count, 2, 'Renders correct number of cards.');
  assert.equal(page.cards(0).cardDescription, 'Visa ending in 4242', 'First card is rendered correctly.');
  assert.equal(page.cards(1).cardDescription, 'Diners ending in 9999', 'Second card is rendered correctly.');
});

test('it allows user to select card', function(assert) {
  assert.expect(1);

  let visa = Object.create({ id: 1, brand: 'Visa', last4: '4242' });
  let diners = Object.create({ id: 2, brand: 'Diners', last4: '9999' });

  this.set('cards', [
    visa, diners
  ]);

  function selectCardHandler(card) {
    assert.ok(card, visa, 'Card was passed correctly.');
  }

  setHandlers(this, selectCardHandler);

  page.render(hbs`{{donation/card-list cards=cards selectCard=selectCardHandler}}`);

  page.cards(1).clickCard();
});
