import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';

import errorFormatterComponent from '../../pages/components/error-formatter';

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

const mockAdapterError = {
  isAdapterError: true,
  errors: [
    { title: 'First', detail: 'error' },
    { title: 'Second', detail: 'error' }
  ]
};

const mockValidationErrors = {
  isAdapterError: true,
  errors: [
    {
      id: 'VALIDATION_ERROR',
      source: { pointer: 'data/attributes/amount' },
      detail: 'is all wrong',
      status: 422
    }, {
      id: 'VALIDATION_ERROR',
      source: { pointer: 'data/attributes/description' },
      detail: "is bad, m'kay?",
      status: 422
    }
  ]
};

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

  this.set('error', mockAdapterError);
  page.render(hbs`{{error-formatter error=error}}`);
  assert.equal(page.errors().count, 2, 'Each error message is rendered');
  assert.equal(page.errors(0).text, 'First: error', 'First message is rendered');
  assert.equal(page.errors(1).text, 'Second: error', 'Second message is rendered');
});

test('it formats adapter validation error properly', function(assert) {
  assert.expect(3);

  this.set('error', mockValidationErrors);
  page.render(hbs`{{error-formatter error=error}}`);
  assert.equal(page.errors().count, 2, 'Each error message is rendered');
  assert.equal(page.errors(0).text, 'Amount is all wrong', 'First message is rendered');
  assert.equal(page.errors(1).text, "Description is bad, m'kay?", 'Second message is rendered');
});

test('it formats stripe card error properly', function(assert) {
  assert.expect(1);

  this.set('error', mockStripeError);
  page.render(hbs`{{error-formatter error=error}}`);
  assert.equal(page.errors(0).text, mockStripeError.error.message, 'Message is rendered');
});

test('it displays a default message if the error structure is not supported', function(assert) {
  assert.expect(2);

  this.set('error', {});
  page.render(hbs`{{error-formatter error=error}}`);
  assert.equal(page.errors().count, 1, 'Each error message is rendered');
  assert.equal(page.errors(0).text, 'An unexpected error has occured', 'Default message is rendered');
});
