import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('task-status', 'Integration | Component | task status', {
  integration: true
});

test('it renders closed status', function(assert) {
  assert.expect(2);

  let task = { status: 'closed' };
  this.set('task', task);
  this.render(hbs`{{task-status task=task}}`);

  assert.equal(this.$('.task-status').hasClass('closed'), true);
  assert.equal(this.$('.task-status').text().trim(), 'Closed');
});

test('it renders open status', function(assert) {
  assert.expect(2);

  let task = { status: 'open' };
  this.set('task', task);
  this.render(hbs`{{task-status task=task}}`);

  assert.equal(this.$('.task-status').hasClass('open'), true);
  assert.equal(this.$('.task-status').text().trim(), 'Open');
});
