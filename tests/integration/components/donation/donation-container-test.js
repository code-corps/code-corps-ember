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

function setHandlers(context, { donateHandler = K, saveAndDonateHandler = K } = {}) {
  context.set('donateHandler', donateHandler);
  context.set('saveAndDonateHandler', saveAndDonateHandler);
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

test('it renders new card form when there is no card to begin with', function(assert) {
  assert.expect(2);

  this.set('amount', 100);
  this.set('projectTitle', 'CodeCorps');
  this.set('card', null);

  page.render(hbs`
    {{donation/donation-container
      card=card donate=donateHandler donationAmount=amount projectTitle=projectTitle saveAndDonate=saveAndDonateHandler }}
  `);

  assert.ok(page.cardFormIsVisible, 'The new card form is rendered automatically.');
  assert.notOk(page.cards(0).isVisible, 'The card item is not visible.');
});

test('it renders the card item and the "donate" button when a card exists', function(assert) {
  assert.expect(3);

  this.set('card', visa);

  page.render(hbs`
    {{donation/donation-container
      card=card donate=donateHandler donationAmount=amount projectTitle=projectTitle saveAndDonate=saveAndDonateHandler }}
  `);

  assert.notOk(page.cardFormIsVisible, 'Credit card form component is not rendered.');
  assert.ok(page.cards(0).isVisible, 'Credit card item is rendered.');
  assert.ok(page.donationButtonIsVisible, 'Donation button is rendered.');
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

  function saveAndDonateHandler(actualProps) {
    assert.deepEqual(actualProps, cardDetails, 'Card parameters were passed correctly.');
    return RSVP.resolve();
  }

  setHandlers(this, { saveAndDonateHandler });

  this.set('card', null);

  page.render(hbs`
    {{donation/donation-container
      card=card donate=donateHandler donationAmount=amount projectTitle=projectTitle saveAndDonate=saveAndDonateHandler }}
  `);

  page.creditCard.cardNumber.fillIn(cardDetails.cardNumber);
  page.creditCard.cardMonth.selectOption(cardDetails.month);
  page.creditCard.cardYear.selectOption(cardDetails.year);
  page.creditCard.cardCVC.fillIn(cardDetails.cvc);
  page.creditCard.clickSubmit();
});

test('it handles donating correctly', function(assert) {
  assert.expect(1);

  let amount = 100;

  this.set('amount', amount);

  this.set('card', visa);

  function donateHandler() {
    assert.ok(true, 'Action was called.');
  }

  setHandlers(this, { donateHandler });

  page.render(hbs`
    {{donation/donation-container
      card=card donate=donateHandler donationAmount=amount projectTitle=projectTitle saveAndDonate=saveAndDonateHandler }}
  `);

  page.clickSubmit();
});
