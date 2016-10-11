import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('task-item', 'Integration | Component | task item', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{task-item}}`);
  assert.equal(this.$('.task-item').length, 1, 'The component element is rendered');
});

test('it renders all required elements', function(assert) {
  assert.expect(3);

  let task = {
    title: 'Clean the house',
    taskType: 'task'
  };

  this.set('task', task);
  this.render(hbs`{{task-item task=task}}`);

  assert.equal(this.$('.task-title').text().trim(), 'Clean the house', 'The title renders');
  assert.equal(this.$('.task-description').length, 1, 'The description renders');
  assert.equal(this.$('.task-icon').length, 1, 'The task icon renders');
});

test('it renders with correct task-type class', function(assert) {
  this.set('task', { taskType: 'task' });
  this.render(hbs`{{task-item task=task}}`);
  assert.equal(this.$('.task-item.task').length, 1, 'Task rendered with a .task class');

  this.set('task', { taskType: 'issue' });
  this.render(hbs`{{task-item task=task}}`);
  assert.equal(this.$('.task-item.issue').length, 1, 'Issue rendered with an .issue class');

  this.set('task', { taskType: 'idea' });
  this.render(hbs`{{task-item task=task}}`);
  assert.equal(this.$('.task-item.idea').length, 1, 'Idea rendered with an .idea class');
});
