import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import donationAmountButtonComponent from '../../../pages/components/donations/donation-amount-button';

const {
  K
} = Ember;

let page = PageObject.create(donationAmountButtonComponent);

function setHandler(context, { actionHandler = K } = {}) {
  context.set('actionHandler', actionHandler);
}

moduleForComponent('donations/donation-amount-button', 'Integration | Component | donations/donation amount button', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sends action with specified amount when clicked', function(assert) {
  assert.expect(1);

  let actionHandler = function(amount) {
    assert.equal(amount, 5, 'Proper amount was sent with action');
  };

  setHandler(this, { actionHandler });

  page.render(hbs`{{donations/donation-amount-button action=actionHandler presetAmount=5}}`)
      .clickButton();
});

test('it shows as active if button is selected', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/donation-amount-button action=actionHandler presetAmount=5 selectedAmount=5}}`);

  assert.ok(page.isActive, 'Button is rendered as active');
});

test('it shows as inactive if button is not selected', function(assert) {
  assert.expect(1);

  page.render(hbs`{{donations/donation-amount-button action=actionHandler presetAmount=5 selectedAmount=10}}`);

  assert.ok(page.isInactive, 'Button is rendered as inActive');
});
