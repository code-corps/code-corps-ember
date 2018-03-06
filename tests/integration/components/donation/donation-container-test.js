import RSVP from 'rsvp';
import { moduleForComponent, test } from 'ember-qunit';
import donationContainerComponent from '../../../pages/components/donation/donation-container';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import StripeMock from 'ember-stripe-elements/utils/stripe-mock';

let page = PageObject.create(donationContainerComponent);

let visa = { id: 1, brand: 'Visa', last4: '4242' };

function setHandlers(context, { donateHandler = function() {}, saveAndDonateHandler = function() {} } = {}) {
  context.set('donateHandler', donateHandler);
  context.set('saveAndDonateHandler', saveAndDonateHandler);
}

moduleForComponent('donation/donation-container', 'Integration | Component | donation/donation container', {
  integration: true,
  beforeEach() {
    setHandlers(this);
    page.setContext(this);
    window.Stripe = StripeMock;
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders new card form when there is no card to begin with', function(assert) {
  assert.expect(2);

  this.set('amount', 100);
  this.set('isProcessing', false);
  this.set('projectTitle', 'CodeCorps');
  this.set('card', { content: null, isFulfilled: true });

  this.render(hbs`
    {{donation/donation-container
      card=card donate=donateHandler donationAmount=amount
      isProcessing=isProcessing projectTitle=projectTitle saveAndDonate=saveAndDonateHandler }}
  `);

  assert.ok(page.cardFormIsVisible, 'The new card form is rendered automatically.');
  assert.notOk(page.cards.objectAt(0).isVisible, 'The card item is not visible.');
});

test('it renders new card form when the card is added and is processing', function(assert) {
  assert.expect(2);

  this.set('amount', 100);
  this.set('isProcessing', false);
  this.set('projectTitle', 'CodeCorps');
  this.set('card', { content: null, isFulfilled: true });

  this.render(hbs`
    {{donation/donation-container
      card=card
      donate=donateHandler
      isProcessing=isProcessing
      saveAndDonate=saveAndDonateHandler
    }}
  `);

  this.set('card', visa);
  this.set('isProcessing', true);

  assert.ok(page.cardFormIsVisible, 'The new card form is rendered.');
  assert.notOk(page.cards.objectAt(0).isVisible, 'The card item is not visible.');
});

test('it renders the card item if there is a card and the form is processing', function(assert) {
  assert.expect(3);

  this.set('card', visa);
  this.set('isProcessing', true);

  this.render(hbs`
    {{donation/donation-container
      card=card
      donate=donateHandler
      isProcessing=isProcessing
      saveAndDonate=saveAndDonateHandler
    }}
  `);

  assert.notOk(page.cardFormIsVisible, 'The new card form is not rendered.');
  assert.ok(page.donationButtonIsVisible, 'Donation button is rendered.');
  assert.ok(page.cards.objectAt(0).isVisible, 'The card item is visible.');
});

test('it renders the card item and the "donate" button when a card exists', function(assert) {
  assert.expect(3);

  this.set('card', visa);

  this.render(hbs`
    {{donation/donation-container
      card=card donate=donateHandler donationAmount=amount projectTitle=projectTitle saveAndDonate=saveAndDonateHandler }}
  `);

  assert.notOk(page.cardFormIsVisible, 'Credit card form component is not rendered.');
  assert.ok(page.cards.objectAt(0).isVisible, 'Credit card item is rendered.');
  assert.ok(page.donationButtonIsVisible, 'Donation button is rendered.');
});

test('it handles adding a card correctly', function(assert) {
  assert.expect(1);

  function saveAndDonateHandler(stripeElement) {
    assert.ok(stripeElement.hasOwnProperty('mount'));
    return RSVP.resolve();
  }

  setHandlers(this, { saveAndDonateHandler });

  this.set('card', null);

  this.render(hbs`
    {{donation/donation-container
      card=card donate=donateHandler donationAmount=amount projectTitle=projectTitle saveAndDonate=saveAndDonateHandler }}
  `);

  page.clickSubmit();
});

test('it handles donating correctly', function(assert) {
  assert.expect(1);

  this.set('amount', 100);
  this.set('card', visa);

  function donateHandler() {
    assert.ok(true, 'Action was called.');
  }

  setHandlers(this, { donateHandler });

  this.render(hbs`
    {{donation/donation-container
      card=card donate=donateHandler donationAmount=amount projectTitle=projectTitle saveAndDonate=saveAndDonateHandler }}
  `);

  page.clickSubmit();
});
