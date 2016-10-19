import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('signup-password-input', 'Integration | Component | signup password input', {
  integration: true
});

test('it shows nothing when empty', function(assert) {
  this.render(hbs`{{signup-password-input}}`);

  assert.equal(this.$('.suggestions li').length, 0);
});

test('it shows suggestions when needed', function(assert) {
  this.set('user', { password: 'password' });
  this.render(hbs`{{signup-password-input user=user}}`);

  assert.equal(this.$('p').hasClass('ok'), true);
  assert.equal(this.$('.suggestions li').length, 2);
  assert.equal(this.$('.suggestions li:eq(0)').text().trim(), 'Tips for a stronger password:');
  assert.equal(this.$('.suggestions li:eq(1)').text().trim(), 'Add another word or two. Uncommon words are better.');
});

test('it shows password strength', function(assert) {
  // https://xkcd.com/936/
  this.set('user', { password: 'correcthorsebatterystaple' });
  this.render(hbs`{{signup-password-input user=user}}`);

  assert.equal(this.$('.progress-bar').attr('style'), 'width: 100%;');
});

test('it shows minimum length error', function(assert) {
  this.set('user', { password: 'p' });
  this.render(hbs`{{signup-password-input user=user}}`);

  assert.equal(this.$('p').hasClass('not-ok'), true);
  assert.equal(this.$('.suggestions li').length, 1);
  assert.equal(this.$('.suggestions li:eq(0)').text().trim(), 'Your password must be at least 6 characters.');
});
