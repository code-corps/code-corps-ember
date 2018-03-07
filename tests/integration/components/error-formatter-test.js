import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import errorFormatterComponent from '../../pages/components/error-formatter';

import { AdapterError } from 'ember-data/adapters/errors';
import FriendlyError from 'code-corps-ember/utils/friendly-error';

let page = PageObject.create(errorFormatterComponent);

moduleForComponent('error-formatter', 'Integration | Component | error formatter', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

const mockStripeError = {
  error: {
    type: 'card_error',
    code: 'invalid_expiry_year',
    message: "Your card's expiration year is invalid.",
    param: 'exp_year'
  }
};

test('it formats adapter error properly', function(assert) {
  assert.expect(3);

  let adapterError = new AdapterError([
    { id: 'INTERNAL_SERVER_ERROR', title: 'First', detail: 'error' },
    { id: 'INTERNAL_SERVER_ERROR', title: 'Second', detail: 'error' }
  ]);

  this.set('error', adapterError);
  this.render(hbs`{{error-formatter error=error}}`);
  assert.equal(page.errors.length, 2, 'Each error message is rendered');
  assert.equal(page.errors.objectAt(0).text, 'First: error', 'First message is rendered');
  assert.equal(page.errors.objectAt(1).text, 'Second: error', 'Second message is rendered');
});

test('it formats friendly errors properly', function(assert) {
  assert.expect(2);

  let friendlyError = new FriendlyError('A friendly error');

  this.set('error', friendlyError);
  this.render(hbs`{{error-formatter error=error}}`);
  assert.equal(page.errors.length, 1, 'Error message is rendered');
  assert.equal(page.errors.objectAt(0).text, 'A friendly error', 'Message text is rendered');
});

test('it formats stripe card error properly', function(assert) {
  assert.expect(1);

  this.set('error', mockStripeError);
  this.render(hbs`{{error-formatter error=error}}`);
  assert.equal(page.errors.objectAt(0).text, mockStripeError.error.message, 'Message is rendered');
});

test('it displays a default message if the error structure is not supported', function(assert) {
  assert.expect(2);

  this.set('error', {});
  this.render(hbs`{{error-formatter error=error}}`);
  assert.equal(page.errors.length, 1, 'Each error message is rendered');
  assert.equal(page.errors.objectAt(0).text, 'An unexpected error has occured', 'Default message is rendered');
});
