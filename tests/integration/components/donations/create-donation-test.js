import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import createDonationComponent from '../../../pages/components/donations/create-donation';

const {
  K
} = Ember;

let page = PageObject.create(createDonationComponent);

function setHandler(context, continueHandler = K) {
  context.set('continueHandler', continueHandler);
}

moduleForComponent('donations/create-donation', 'Integration | Component | donations/create donation', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders properly', function(assert) {
  assert.expect(6);

  page.render(hbs`{{donations/create-donation class="donation-status__create-donation" continue=continueHandler}}`);

  assert.ok(page.setTo10.isRendered, 'Button for preset amount of 10 is rendered.');
  assert.ok(page.setTo15.isRendered, 'Button for preset amount of 15 is rendered.');
  assert.ok(page.setTo25.isRendered, 'Button for preset amount of 25 is rendered.');
  assert.ok(page.setTo50.isRendered, 'Button for preset amount of 50 is rendered.');
  assert.ok(page.rendersSetCustomField, 'Input for custom amount is rendered.');
  assert.ok(page.rendersContinueButton, 'Continue button is rendered.');
});

test('preset amount buttons unset the input value', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/create-donation class="donation-status__create-donation" continue=continueHandler}}`);

  page.setTo10.clickButton();
  assert.equal(page.customAmountValue, '', 'Button was clicked, so custom value should be unset.');
});

test('clicking "continue" calls action with present amount as argument', function(assert) {
  assert.expect(1);

  function continueHandler(amount) {
    assert.equal(amount, 15, 'Proper amount was sent via action.');
  }

  setHandler(this, continueHandler);

  page.render(hbs`{{donations/create-donation class="donation-status__create-donation" continue=continueHandler}}`);

  page.setTo15.clickButton();
  page.clickContinue();
});

test('clicking "continue" calls action with custom amount as argument', function(assert) {
  assert.expect(1);

  function continueHandler(amount) {
    assert.equal(amount, 22, 'Proper amount was sent via action.');
  }

  setHandler(this, continueHandler);

  page.render(hbs`{{donations/create-donation class="donation-status__create-donation" continue=continueHandler}}`);

  page.customAmount(22);
  page.clickContinue();
});

test('buttons do not activate when custom amount is set to preset value', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/create-donation class="donation-status__create-donation" continue=continueHandler}}`);

  page.customAmount(50);
  assert.notOk(page.setTo50.isActive, 'Related button should not be active.');
});
