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

let mockStripeCard = {
  brand: 'Visa',
  exp_month: '12',
  exp_year: '2020',
  last4: '4242'
};

function setHandlers(context, { donateHandler = K, addCardHandler = RSVP } = {}) {
  context.set('donateHandler', donateHandler);
  context.set('addCardHandler', addCardHandler);
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

test('it renders basic elements', function(assert) {
  assert.expect(2);

  this.set('amount', 100);
  this.set('projectTitle', 'CodeCorps');

  page.render(hbs`{{donation/donation-container donate=(action donateHandler) donationAmount=amount projectTitle=projectTitle}}`);

  assert.equal(page.donationAmountText, '$100.00 given each month', 'Amount text is rendered correctly');
  assert.equal(
    page.paymentInformationText,
    'Your payment method will be charged $100.00 per month to support CodeCorps.',
    'Payment information renders correctly.'
  );
});

test('it renders the right elements when adding a card and has existing cards', function(assert) {
  assert.expect(2);

  this.set('cards', [mockStripeCard]);

  page.render(hbs`{{donation/donation-container cards=cards isAddingCard=true}}`);

  assert.ok(page.cardFormIsVisible, 'Credit card form component is rendered.');
  assert.notOk(page.cardListIsVisible, 'Credit card list is not rendered.');
});

test('it renders the right elements when not adding a card and has existing cards', function(assert) {
  assert.expect(3);

  this.set('cards', [mockStripeCard]);

  page.render(hbs`{{donation/donation-container canDonate=true cards=cards donate=(action donateHandler amount) isAddingCard=false}}`);

  assert.notOk(page.cardFormIsVisible, 'Credit card form component is not rendered.');
  assert.ok(page.cardListIsVisible, 'Credit card list is rendered.');
  assert.ok(page.donationButtonIsVisible, 'Donation button renders');
});

test('it handles adding a card correctly', function(assert) {
  assert.expect(1);

  let cardDetails = {
    cardNumber: '1234-5678-9012-3456',
    cvc: '123',
    month: '12',
    year: '2020'
  };

  function addCardHandler(actualProps) {
    assert.deepEqual(actualProps, cardDetails, 'Card parameters were passed correctly.');
    return RSVP.resolve();
  }

  stubService(this, 'stripe', {
    card: {
      validateCardNumber: K,
      validateCVC: K,
      validateExpiry: K
    }
  });

  setHandlers(this, { addCardHandler });

  page.render(hbs`{{donation/donation-container addCard=(action addCardHandler)}}`);

  page.creditCard
      .cardNumber(cardDetails.cardNumber)
      .cardMonth(cardDetails.month)
      .cardYear(cardDetails.year)
      .cardCVC(cardDetails.cvc)
      .clickSubmit();
});

test('it handles donating correctly', function(assert) {
  assert.expect(1);

  let amount = 100;
  this.set('amount', amount);

  this.set('cards', [mockStripeCard]);

  function donateHandler(actualProps) {
    assert.deepEqual(actualProps, amount, 'The proper amount is sent correctly.');
    return RSVP.resolve();
  }

  setHandlers(this, { donateHandler });

  page.render(hbs`{{donation/donation-container cards=cards donate=(action donateHandler amount) donationAmount=amount}} isAddingCard`);

  page.clickSubmit();
});
