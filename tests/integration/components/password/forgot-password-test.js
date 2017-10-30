import RSVP from 'rsvp';
import { getOwner } from '@ember/application';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import forgotPasswordComponent from 'code-corps-ember/tests/pages/components/password/forgot-password';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(forgotPasswordComponent);

moduleForComponent('password/forgot-password', 'Integration | Component | password/forgot password', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders with email input and correct label', function(assert) {
  assert.expect(4);
  getOwner(this).lookup('service:flash-messages').registerTypes(['success']);

  this.forgotPassword = function() {
    assert.ok(true);
  };
  this.render(hbs`{{password/forgot-password forgotPassword=forgotPassword}}`);

  assert.equal(page.emailInput.isVisible, true);
  assert.equal(page.passwordHeader, 'Enter your email and we\'ll send you a link to reset your password.');
  assert.equal(page.button.text, 'Send password reset email');

  page.submit();
});

test('can fill out form and submit', function(assert) {
  assert.expect(2);
  getOwner(this).lookup('service:flash-messages').registerTypes(['success']);

  this.forgotPassword = function(email) {
    assert.equal(email, 'admin@email.com');
  };
  this.render(hbs`{{password/forgot-password forgotPassword=forgotPassword}}`);

  page.email('admin@email.com');
  assert.equal(page.emailInput.value, 'admin@email.com');

  page.submit();
});

test('500 error is displayed', function(assert) {
  assert.expect(1);

  this.forgotPassword = function() {
    return RSVP.Promise.reject({ isAdapterError: true, errors: [{ id: 'INTERNAL_SERVER_ERROR', title: '500 Internal server error', status: '500' }] });
  };
  this.render(hbs`{{password/forgot-password forgotPassword=forgotPassword}}`);

  page.email('admin@email.com');
  page.submit();

  assert.equal(this.$('[data-test-id="error-msg"]').length, 1);
});

test('can recover from error', function(assert) {
  assert.expect(3);
  getOwner(this).lookup('service:flash-messages').registerTypes(['success']);

  this.forgotPassword = function(email) {
    assert.equal(email, 'admin@email.com');
  };
  this.error = new Event('errors');
  this.error.isAdapterError = true;
  this.error.errors = [{ id: 'INTERNAL_SERVER_ERROR', title: '500 Internal Server Error' }];
  this.render(hbs`{{password/forgot-password forgotPassword=forgotPassword error=error}}`);

  assert.equal(this.$('[data-test-id="error-msg"]').length, 1);

  page.email('admin@email.com');
  page.submit();

  assert.equal(this.$('[data-test-id="error-msg"]').length, 0);
});
