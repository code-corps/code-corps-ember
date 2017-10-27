import RSVP from 'rsvp';
import { getOwner } from '@ember/application';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import resetPasswordComponent from 'code-corps-ember/tests/pages/components/password/reset-password';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(resetPasswordComponent);

moduleForComponent('password/reset-password', 'Integration | Component | password/reset password', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders with two password inputs and correct label', function(assert) {
  assert.expect(8);
  getOwner(this).lookup('service:flash-messages').registerTypes(['success']);

  this.resetPassword = function() {
    assert.ok(true);
  };
  this.render(hbs`{{password/reset-password resetPassword=resetPassword}}`);

  assert.equal(page.passwordInput.isVisible, true);
  assert.equal(page.passwordConfirmationInput.isVisible, true);
  assert.equal(page.passwordLabel, 'Password');
  assert.equal(page.passwordInput.property, 'password');
  assert.equal(page.passwordConfirmationLabel, 'Confirm password');
  assert.equal(page.passwordConfirmationInput.property, 'password');

  assert.equal(page.button.text, 'Change password');

  page.submit();
});

test('can fill out form and submit', function(assert) {
  assert.expect(2);
  getOwner(this).lookup('service:flash-messages').registerTypes(['success']);

  this.resetPassword = function(password, passwordConfirmation) {
    assert.equal(password, 'uuidPassword');
    assert.equal(passwordConfirmation, 'uuidPassword');
  };
  this.render(hbs`{{password/reset-password resetPassword=resetPassword}}`);

  page.password('uuidPassword');
  page.passwordConfirmation('uuidPassword');

  page.submit();
});

test('500 error is displayed', function(assert) {
  assert.expect(1);

  this.resetPassword = function() {
    return RSVP.Promise.reject({ isAdapterError: true, errors: [{ id: 'INTERNAL_SERVER_ERROR', 'title': '500 Internal server error', status: '500' }] });
  };
  this.render(hbs`{{password/reset-password resetPassword=resetPassword}}`);

  page.submit();
  assert.equal(this.$('[data-test-id="error-msg"]').length, 1);
});
