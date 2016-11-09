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

  page.render(hbs`{{donations/create-donation continue=continueHandler}}`);

  assert.ok(page.setTo10.isRendered, 'Button for preset amount of 10 is rendered.');
  assert.ok(page.setTo15.isRendered, 'Button for preset amount of 15 is rendered.');
  assert.ok(page.setTo25.isRendered, 'Button for preset amount of 25 is rendered.');
  assert.ok(page.setTo50.isRendered, 'Button for preset amount of 50 is rendered.');
  assert.ok(page.rendersSetCustomField, 'Input for custom amount is rendered.');
  assert.ok(page.rendersContinueButton, 'Continue button is rendered.');
});

test('preset amount buttons work', function(assert) {
  assert.expect(4);

  page.render(hbs`{{donations/create-donation continue=continueHandler}}`);

  page.setTo10.clickButton();
  assert.equal(page.customAmountValue, 10, 'Button for preset amount of 10 was clicked, so proper value should be set.');
  page.setTo15.clickButton();
  assert.equal(page.customAmountValue, 15, 'Button for preset amount of 15 was clicked, so proper value should be set.');
  page.setTo25.clickButton();
  assert.equal(page.customAmountValue, 25, 'Button for preset amount of 25 was clicked, so proper value should be set.');
  page.setTo50.clickButton();
  assert.equal(page.customAmountValue, 50, 'Button for preset amount of 50 was clicked, so proper value should be set.');
});

test('clicking "continue" calls action with amount as argument', function(assert) {
  assert.expect(1);

  function continueHandler(amount) {
    assert.equal(amount, 22, 'Proper amount was sent via action.');
  }

  setHandler(this, continueHandler);

  page.render(hbs`{{donations/create-donation continue=continueHandler}}`);

  page.customAmount(22);
  page.clickContinue();
});

test('buttons activate properly when custom amount is set to preset value', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/create-donation continue=continueHandler}}`);

  page.customAmount(22);
  page.customAmount(15);
  assert.ok(page.setTo15.isActive, 'Proper button should be active.');
});
