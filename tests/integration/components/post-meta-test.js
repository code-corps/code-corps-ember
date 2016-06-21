import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('post-meta', 'Integration | Component | post meta', {
  integration: true
});

test('it renders closed status', function(assert) {
  assert.expect(2);

  let post = { status: 'closed' };
  this.set('post', post);
  this.render(hbs`{{post-meta post=post}}`);

  assert.equal(this.$('.post-status').hasClass('closed'), true);
  assert.equal(this.$('.post-status').text().trim(), 'Closed');
});

test('it renders open status', function(assert) {
  assert.expect(2);

  let post = { status: 'open' };
  this.set('post', post);
  this.render(hbs`{{post-meta post=post}}`);

  assert.equal(this.$('.post-status').hasClass('open'), true);
  assert.equal(this.$('.post-status').text().trim(), 'Open');
});
