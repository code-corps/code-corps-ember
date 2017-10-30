import { set } from '@ember/object';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import createDonationComponent from '../../../pages/components/donations/create-donation';

let page = PageObject.create(createDonationComponent);

function renderPage() {
  page.render(hbs`
    {{donations/create-donation amount=amount continue=onContinue onAmountChanged=(action (mut amount))}}
  `);
}

moduleForComponent('donations/create-donation', 'Integration | Component | donations/create donation', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'onContinue', () => {});
    set(this, 'onAmountChanged', () => {});
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders properly', function(assert) {
  assert.expect(6);

  renderPage();

  assert.ok(page.setTo10.isRendered, 'Button for preset amount of 10 is rendered.');
  assert.ok(page.setTo15.isRendered, 'Button for preset amount of 15 is rendered.');
  assert.ok(page.setTo25.isRendered, 'Button for preset amount of 25 is rendered.');
  assert.ok(page.setTo50.isRendered, 'Button for preset amount of 50 is rendered.');
  assert.ok(page.rendersSetCustomField, 'Input for custom amount is rendered.');
  assert.ok(page.rendersContinueButton, 'Continue button is rendered.');
});

test('unsetting the input value resets to the fallback amount', function(assert) {
  assert.expect(2);

  renderPage();

  page.setTo10.clickButton();
  page.customAmount(12.5);
  assert.ok(page.setTo25.isInactive, 'The button is inactive.');

  page.customAmount('');

  assert.ok(page.setTo25.isActive, 'The button is active.');
});

test('preset amount buttons unset the input value', function(assert) {
  assert.expect(1);

  renderPage();

  page.setTo10.clickButton();
  assert.equal(page.customAmountValue, '', 'The custom value was unset.');
});

test('clicking "continue" calls action with preset amount as argument', function(assert) {
  assert.expect(1);

  set(this, 'onContinue', (amount) => {
    assert.equal(amount, 15, 'Proper amount was sent via action.');
  });

  renderPage();

  page.setTo15.clickButton();
  page.clickContinue();
});

test('clicking "continue" calls action with custom amount as argument', function(assert) {
  assert.expect(1);

  set(this, 'onContinue', (amount) => {
    assert.equal(amount, 22, 'Proper amount was sent via action.');
  });

  renderPage();

  page.customAmount(22);
  page.clickContinue();
});

test('buttons do not activate when custom amount is set to preset value', function(assert) {
  assert.expect(1);

  renderPage();

  page.customAmount(50);
  assert.ok(page.setTo50.isActive, 'Related button should be active.');
});

test('calls action when custom amount changes', function(assert) {
  assert.expect(1);

  let filledInAmount = 12.5;

  set(this, 'onAmountChanged', (changedAmount) => {
    assert.equal(changedAmount, filledInAmount, 'The correct amount was sent.');
  });

  page.render(hbs`
    {{donations/create-donation amount=amount continue=onContinue onAmountChanged=onAmountChanged}}
  `);

  page.customAmount(filledInAmount);
});

test('preselects one of the buttons if amount is externally set to appropriate value.', function(assert) {
  assert.expect(16);

  renderPage();

  [10, '10', 10.0, '10.0'].forEach((amount) => {
    run(() => set(this, 'amount', amount));
    assert.ok(page.setTo10.isActive, 'Button to set amount to 10 is rendered as active');
  });

  [15, '15', 15.0, '15.0'].forEach((amount) => {
    run(() => set(this, 'amount', amount));
    assert.ok(page.setTo15.isActive, 'Button to set amount to 15 is rendered as active');
  });

  [25, '25', 25.0, '25.0'].forEach((amount) => {
    run(() => set(this, 'amount', amount));
    assert.ok(page.setTo25.isActive, 'Button to set amount to 25 is rendered as active');
  });

  [50, '50', 50.0, '50.0'].forEach((amount) => {
    run(() => set(this, 'amount', amount));
    assert.ok(page.setTo50.isActive, 'Button to set amount to 50 is rendered as active');
  });
});
