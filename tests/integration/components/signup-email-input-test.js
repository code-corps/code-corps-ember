import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import startMirage from '../../helpers/setup-mirage-for-integration';
import wait from 'ember-test-helpers/wait';

const { run } = Ember;

moduleForComponent('signup-email-input', 'Integration | Component | signup email input', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

test('it shows nothing when empty', function(assert) {
  this.render(hbs`{{signup-email-input}}`);

  assert.equal(this.$('.suggestions li').length, 0);
  assert.equal(this.$('.suggestions p').hasClass('ok'), false);
  assert.equal(this.$('.suggestions p').hasClass('not-ok'), false);
});

test('it shows suggestions when invalid', function(assert) {
  let done = assert.async();
  assert.expect(5);

  server.get('/users/email_available', () => {
    return { valid: false, available: true };
  });

  this.on('emailValidated', (result) => {
    run.next(() => {
      assert.equal(result, false);
    });
  });
  this.render(hbs`{{signup-email-input user=user emailValidated="emailValidated"}}`);

  this.set('user', { email: 'incomplete@' });

  wait().then(() => {
    assert.equal(this.$('.suggestions p').hasClass('ok'), false);
    assert.equal(this.$('.suggestions p').hasClass('not-ok'), true);
    assert.equal(this.$('.suggestions li').length, 1);
    assert.equal(this.$('.suggestions li:eq(0)').text().trim(), 'Please enter a valid email.');
    done();
  });
});

test('it shows suggestions when unavailable', function(assert) {
  let done = assert.async();
  assert.expect(5);

  server.get('/users/email_available', () => {
    return { valid: true, available: false };
  });

  this.on('emailValidated', (result) => {
    run.next(() => {
      assert.equal(result, false);
    });
  });
  this.render(hbs`{{signup-email-input user=user emailValidated="emailValidated"}}`);

  this.set('user', { email: 'taken@gmail.com' });

  wait().then(() => {
    assert.equal(this.$('.suggestions p').hasClass('ok'), false);
    assert.equal(this.$('.suggestions p').hasClass('not-ok'), true);
    assert.equal(this.$('.suggestions li').length, 1);
    assert.equal(this.$('.suggestions li:eq(0)').text().trim(), 'This email is already registered. Want to login?');
    done();
  });
});

test('it shows ok when valid and available', function(assert) {
  let done = assert.async();
  assert.expect(4);

  server.get('/users/email_available', () => {
    return { valid: true, available: true };
  });

  this.on('emailValidated', (result) => {
    run.next(() => {
      assert.equal(result, true);
    });
  });
  this.render(hbs`{{signup-email-input user=user emailValidated="emailValidated"}}`);

  this.set('user', { email: 'available@gmail.com' });

  wait().then(() => {
    assert.equal(this.$('.suggestions p').hasClass('ok'), true);
    assert.equal(this.$('.suggestions p').hasClass('not-ok'), false);
    assert.equal(this.$('.suggestions li').length, 0);
    done();
  });
});

test('it resets to invalid when deleted', function(assert) {
  let done = assert.async();
  assert.expect(4);

  server.get('/users/email_available', () => {
    return { valid: true, available: true };
  });

  this.on('emailValidated', (result) => {
    run.next(() => {
      assert.equal(result, false);
    });
  });
  this.set('user', { email: 'available@gmail.com' });
  this.render(hbs`{{signup-email-input user=user emailValidated="emailValidated"}}`);

  this.set('user', { email: '' });

  wait().then(() => {
    assert.equal(this.$('.suggestions p').hasClass('ok'), false);
    assert.equal(this.$('.suggestions p').hasClass('not-ok'), false);
    assert.equal(this.$('.suggestions li').length, 0);
    done();
  });
});
