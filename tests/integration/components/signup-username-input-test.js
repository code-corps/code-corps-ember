import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import startMirage from '../../helpers/setup-mirage-for-integration';
import wait from 'ember-test-helpers/wait';

const { run } = Ember;

moduleForComponent('signup-username-input', 'Integration | Component | signup username input', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

test('it shows nothing when empty', function(assert) {
  this.render(hbs`{{signup-username-input}}`);

  assert.equal(this.$('.suggestions li').length, 0);
  assert.equal(this.$('.suggestions p').hasClass('ok'), false);
  assert.equal(this.$('.suggestions p').hasClass('not-ok'), false);
});

test('it shows suggestions when invalid', function(assert) {
  let done = assert.async();
  assert.expect(5);

  server.get('/users/username_available', () => {
    return { valid: false, available: true };
  });

  this.on('usernameValidated', (result) => {
    run.next(() => {
      assert.equal(result, false);
    });
  });
  this.render(hbs`{{signup-username-input user=user usernameValidated="usernameValidated"}}`);

  this.set('user', { username: 'lots--of--hypens' });

  wait().then(() => {
    assert.equal(this.$('.suggestions p').hasClass('ok'), false);
    assert.equal(this.$('.suggestions p').hasClass('not-ok'), true);
    assert.equal(this.$('.suggestions li').length, 1);
    assert.equal(this.$('.suggestions li:eq(0)').text().trim(), 'Please enter a username with only letters, numbers, or underscores.');
    done();
  });
});

test('it shows suggestions when unavailable', function(assert) {
  let done = assert.async();
  assert.expect(5);

  server.get('/users/username_available', () => {
    return { valid: true, available: false };
  });

  this.on('usernameValidated', (result) => {
    run.next(() => {
      assert.equal(result, false);
    });
  });
  this.render(hbs`{{signup-username-input user=user usernameValidated="usernameValidated"}}`);

  this.set('user', { username: 'taken' });

  wait().then(() => {
    assert.equal(this.$('.suggestions p').hasClass('ok'), false);
    assert.equal(this.$('.suggestions p').hasClass('not-ok'), true);
    assert.equal(this.$('.suggestions li').length, 1);
    assert.equal(this.$('.suggestions li:eq(0)').text().trim(), 'This username is already registered. Want to login?');
    done();
  });
});

test('it shows ok when valid and available', function(assert) {
  let done = assert.async();
  assert.expect(4);

  server.get('/users/username_available', () => {
    return { valid: true, available: true };
  });

  this.on('usernameValidated', (result) => {
    run.next(() => {
      assert.equal(result, true);
    });
  });
  this.render(hbs`{{signup-username-input user=user usernameValidated="usernameValidated"}}`);

  this.set('user', { username: 'available' });

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

  server.get('/users/username_available', () => {
    return { valid: true, available: true };
  });

  this.on('usernameValidated', (result) => {
    run.next(() => {
      assert.equal(result, false);
    });
  });
  this.set('user', { username: 'available' });
  this.render(hbs`{{signup-username-input user=user usernameValidated="usernameValidated"}}`);

  this.set('user', { username: '' });

  wait().then(() => {
    assert.equal(this.$('.suggestions p').hasClass('ok'), false);
    assert.equal(this.$('.suggestions p').hasClass('not-ok'), false);
    assert.equal(this.$('.suggestions li').length, 0);
    done();
  });
});
