import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-task-list', 'Integration | Component | project task list', {
  integration: true
});

test('it renders', function(assert) {
  this.set('tasks', []);

  this.render(hbs`{{project-task-list tasks=tasks}}`);

  assert.equal(this.$('.project-task-list').length, 1);
});

test('it renders a message if the task count is 0', function(assert) {
  this.set('tasks', []);

  this.render(hbs`{{project-task-list tasks=tasks}}`);

  assert.equal(this.$('.empty').length, 1, 'The message is rendered');
  assert.equal(this.$('.empty .empty-icon.box-icon').length, 1, 'The icon is rendered');
  assert.equal(this.$('.empty h3').text().trim(), "Here's where the magic happens.");
  assert.equal(this.$('.empty button').text().trim(), 'Create a task');
});

test('it renders a message if the task count is 0 and tasks are filtered', function(assert) {
  this.set('tasks', []);

  this.render(hbs`{{project-task-list tasks=tasks isFiltered=true}}`);

  assert.equal(this.$('.empty').length, 1, 'The message is rendered');
  assert.equal(this.$('.empty .empty-icon.search-icon').length, 1, 'The icon is rendered');
  assert.equal(this.$('.empty h3').text().trim(), 'Your filters look a little too specific.');
  assert.equal(this.$('.empty p').text().trim(), "We couldn't find any tasks that match all your filters.");
});

test('it renders a task item for each task', function(assert) {
  let tasks = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];
  this.set('tasks', tasks);

  this.render(hbs`{{project-task-list tasks=tasks}}`);

  assert.equal(this.$('.task-item').length, 3, 'The task items are rendered');
});
