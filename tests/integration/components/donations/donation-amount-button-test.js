import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import donationAmountButtonComponent from '../../../pages/components/donations/donation-amount-button';

let page = PageObject.create(donationAmountButtonComponent);

function setHandlers(context, { amountHandler = function() {}, customAmountHandler = function() {} } = {}) {
  context.set('amountHandler', amountHandler);
  context.set('customAmountHandler', customAmountHandler);
}

moduleForComponent('donations/donation-amount-button', 'Integration | Component | donations/donation amount button', {
  integration: true,
  beforeEach() {
    setHandlers(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sends actions when clicked', function(assert) {
  assert.expect(2);

  let amountHandler = function(amount) {
    assert.equal(amount, 5, 'Proper amount was sent');
  };

  let customAmountHandler = function(customAmount) {
    assert.equal(customAmount, null, 'A null custom amount was sent');
  };

  setHandlers(this, { amountHandler, customAmountHandler });

  page.render(hbs`{{donations/donation-amount-button setAmount=amountHandler setCustomAmount=customAmountHandler presetAmount=5}}`);
  page.clickButton();
});

test('it shows as active if button is selected', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/donation-amount-button setAmount=actionHandler presetAmount=5 selectedAmount=5}}`);

  assert.ok(page.isActive, 'Button is rendered as active');
});

test('it shows as inactive if button is not selected', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/donation-amount-button setAmount=actionHandler presetAmount=5 selectedAmount=10}}`);

  assert.ok(page.isInactive, 'Button is rendered as inActive');
});
