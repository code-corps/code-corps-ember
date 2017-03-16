import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import cardLogo from '../../../pages/components/donation/card-logo';

let page = PageObject.create(cardLogo);

moduleForComponent('donation/card-logo', 'Integration | Component | donation/card logo', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders for American Express', function(assert) {
  page.render(hbs`{{donation/card-logo brand="American Express"}}`);
  assert.ok(page.isAmex);
});

test('it renders for Diners Club', function(assert) {
  page.render(hbs`{{donation/card-logo brand="Diners Club"}}`);
  assert.ok(page.isDiners);
});

test('it renders for Discover', function(assert) {
  page.render(hbs`{{donation/card-logo brand="Discover"}}`);
  assert.ok(page.isDiscover);
});

test('it renders for JCB', function(assert) {
  page.render(hbs`{{donation/card-logo brand="JCB"}}`);
  assert.ok(page.isJCB);
});

test('it renders for MasterCard', function(assert) {
  page.render(hbs`{{donation/card-logo brand="MasterCard"}}`);
  assert.ok(page.isMasterCard);
});

test('it renders for Visa', function(assert) {
  page.render(hbs`{{donation/card-logo brand="Visa"}}`);
  assert.ok(page.isVisa);
});

test('it renders for Unknown', function(assert) {
  page.render(hbs`{{donation/card-logo brand="Unknown"}}`);
  assert.ok(page.isUnknown);
});
