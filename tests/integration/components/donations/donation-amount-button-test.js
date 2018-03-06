import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import donationAmountButtonComponent from '../../../pages/components/donations/donation-amount-button';

let page = PageObject.create(donationAmountButtonComponent);

moduleForComponent('donations/donation-amount-button', 'Integration | Component | donations/donation amount button', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders preset value as part of button text', function(assert) {
  assert.expect(1);

  set(this, 'presetAmount', 5);

  this.render(hbs`{{donations/donation-amount-button presetAmount=presetAmount selected=selected}}`);

  assert.equal(page.text, 'Donate $5', 'Value is rendered properly.');
});

test('it shows as active if button is selected', function(assert) {
  assert.expect(1);

  set(this, 'selected', true);

  this.render(hbs`{{donations/donation-amount-button presetAmount=presetAmount selected=selected}}`);

  assert.ok(page.isActive, 'Button is rendered as active');
});

test('it shows as inactive if button is not selected', function(assert) {
  assert.expect(1);

  set(this, 'selected', false);

  this.render(hbs`{{donations/donation-amount-button presetAmount=presetAmount selected=selected}}`);

  assert.ok(page.isInactive, 'Button is rendered as inActive');
});
