import { moduleForComponent, test } from 'ember-qunit';
import donationContainerComponent from '../../../pages/components/donation/donation-container';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

let page = PageObject.create(donationContainerComponent);

const {
  K,
  RSVP
} = Ember;

let visa = Object.create({ id: 1, brand: 'Visa', last4: '4242' });
let mastercard = Object.create({ id: 2, brand: 'Mastercard', last4: '4444' });

function setHandlers(context, { donateHandler = K, saveCardHandler = K } = {}) {
  context.set('donateHandler', donateHandler);
  context.set('saveCardHandler', saveCardHandler);
}

moduleForComponent('donation/donation-container', 'Integration | Component | donation/donation container', {
  integration: true,
  beforeEach() {
    setHandlers(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders new card form when there are no cards to begin with', function(assert) {
  assert.expect(3);

  this.set('amount', 100);
  this.set('projectTitle', 'CodeCorps');
  this.set('cards', []);

  page.render(hbs`
    {{donation/donation-container
      cards=cards donate=donateHandler donationAmount=amount projectTitle=projectTitle saveCard=saveCardHandler }}
  `);

  assert.notOk(page.addNewCardButtonIsVisible, 'The button to show the card form is not visible.');
  assert.ok(page.cardFormIsVisible, 'The new card form is rendered automatically.');
  assert.notOk(page.cardListIsVisible, 'The card list is not visible.');
});

test('it renders the card list and the "add new" button when there are cards to begin with', function(assert) {
  assert.expect(3);

  this.set('cards', [visa]);

  page.render(hbs`
    {{donation/donation-container
      cards=cards donate=donateHandler donationAmount=amount projectTitle=projectTitle saveCard=saveCardHandler }}
  `);

  assert.ok(page.addNewCardButtonIsVisible, 'The button to show the card form is visible.');
  assert.notOk(page.cardFormIsVisible, 'Credit card form component is not rendered.');
  assert.ok(page.cardListIsVisible, 'Credit card list is rendered.');
});

test('it hides the card list and shows the form when clicking the "add new" button', function(assert) {
  assert.expect(3);

  this.set('cards', [visa]);

  page.render(hbs`
    {{donation/donation-container
      cards=cards donate=donateHandler donationAmount=amount projectTitle=projectTitle saveCard=saveCardHandler }}
  `);

  page.clickAddCard();

  assert.notOk(page.addNewCardButtonIsVisible, 'The button to show the card form is not visible.');
  assert.ok(page.cardFormIsVisible, 'The new card form is rendered automatically.');
  assert.notOk(page.cardListIsVisible, 'The card list is not visible.');
});

test('it allows selecting a card', function(assert) {
  assert.expect(4);

  this.set('cards', [visa, mastercard]);

  page.render(hbs`
    {{donation/donation-container
      cards=cards donate=donateHandler donationAmount=amount projectTitle=projectTitle saveCard=saveCardHandler }}
  `);

  assert.ok(page.cardList.cards(0).isSelected, 'First card is selected by default.');
  assert.notOk(page.cardList.cards(1).isSelected, 'Second card is not selected.');
  page.cardList.cards(1).clickCard();
  assert.notOk(page.cardList.cards(0).isSelected, 'First card is not selected.');
  assert.ok(page.cardList.cards(1).isSelected, 'Second card is selected.');
});

test('it handles adding a card correctly', function(assert) {
  assert.expect(1);

  stubService(this, 'stripe', {
    card: {
      validateCardNumber: K,
      validateCVC: K,
      validateExpiry: K
    }
  });

  let cardDetails = {
    cardNumber: '1234-5678-9012-3456',
    cvc: '123',
    month: '12',
    year: '2020'
  };

  function saveCardHandler(actualProps) {
    assert.deepEqual(actualProps, cardDetails, 'Card parameters were passed correctly.');
    return RSVP.resolve();
  }

  setHandlers(this, { saveCardHandler });

  this.set('cards', []);

  page.render(hbs`
    {{donation/donation-container
      cards=cards donate=donateHandler donationAmount=amount projectTitle=projectTitle saveCard=saveCardHandler }}
  `);

  page.creditCard.cardNumber.fillIn(cardDetails.cardNumber);
  page.creditCard.cardMonth.selectOption(cardDetails.month);
  page.creditCard.cardYear.selectOption(cardDetails.year);
  page.creditCard.cardCVC.fillIn(cardDetails.cvc);
  page.creditCard.clickSubmit();
});

test('it handles donating correctly', function(assert) {
  assert.expect(2);

  let amount = 100;

  this.set('amount', amount);

  this.set('cards', [visa]);

  function donateHandler(amount, sentCard) {
    assert.equal(amount, amount, 'The proper amount is sent.');
    assert.deepEqual(sentCard, visa, 'The proper card is sent.');
  }

  setHandlers(this, { donateHandler });

  page.render(hbs`
    {{donation/donation-container
      cards=cards donate=donateHandler donationAmount=amount projectTitle=projectTitle saveCard=saveCardHandler }}
  `);

  page.clickSubmit();
});
