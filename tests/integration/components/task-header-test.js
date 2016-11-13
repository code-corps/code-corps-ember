import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object,
  RSVP
} = Ember;

let mockTask = Object.create({
  title: 'A task',
  body: 'A <strong>body</strong>',
  number: 12,
  taskType: 'issue',
  save() {
    return RSVP.resolve();
  }
});

moduleForComponent('task-header', 'Integration | Component | task header', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{task-header}}`);

  assert.equal(this.$('.task-header').length, 1, 'The component\'s element is rendered');
});

test('it renders all the ui elements properly bound', function(assert) {
  assert.expect(2);

  this.set('task', mockTask);

  this.render(hbs`{{task-header task=task}}`);

  assert.equal(this.$('.task-header .title').text().trim(), 'A task #12', 'Title is correctly bound and rendered');
  assert.equal(this.$('.task-header.issue .task-icon').length, 1, 'Task type is correctly bound and rendered');
});
