import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object,
  RSVP,
  Service
} = Ember;

let mockCurrentUser = Service.extend({
  user: {
    id: 1
  }
});

let mockDifferentUser = Service.extend({
  user: {
    id: 2
  }
});

let mockTask = Object.create({
  title: 'Original title',
  body: 'A <strong>body</strong>',
  number: 12,
  taskType: 'issue',
  user: {
    id: 1
  },
  save() {
    this.set('title', this.get('title'));
    return RSVP.resolve();
  }
});

moduleForComponent('task-title', 'Integration | Component | task title', {
  integration: true,
  beforeEach() {
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{task-title}}`);
  assert.equal(this.$('.task-title').length, 1, 'The component\'s element is rendered');
});

test('it is not editable if not the right user', function(assert) {
  this.register('service:current-user', mockDifferentUser);

  assert.expect(1);
  this.render(hbs`{{task-title}}`);
  assert.equal(this.$('.task-title .edit').length, 0);
});

test('it switches between edit and view mode', function(assert) {
  assert.expect(8);

  this.register('service:current-user', mockCurrentUser);

  this.set('task', mockTask);
  this.render(hbs`{{task-title task=task}}`);

  assert.equal(this.$('.task-title.editing').length, 0, 'Component is not in edit mode');
  assert.equal(this.$('.task-title.editing input[name=title]').length, 0, 'Input element is not rendered');
  assert.equal(this.$('.task-title .title').length, 1, 'Display element is rendered');
  this.$('.task-title .edit').click();
  assert.equal(this.$('.task-title.editing').length, 1, 'Component is in edit mode');
  assert.equal(this.$('.task-title.editing input[name=title]').length, 1, 'Input element is rendered');
  assert.equal(this.$('.task-title.editing .save').length, 1, 'Save button is rendered');
  assert.equal(this.$('.task-title.editing .cancel').length, 1, 'Cancel button is rendered');
  this.$('.task-title .cancel').click();
  assert.equal(this.$('.task-title.editing').length, 0, 'Component is not in edit mode');
});

test('it saves', function(assert) {
  assert.expect(2);

  this.register('service:current-user', mockCurrentUser);

  this.set('task', mockTask);
  this.on('applyEdit', () => {
    return RSVP.resolve();
  });
  this.render(hbs`{{task-title task=task saveTask=(action "applyEdit")}}`);

  assert.equal(this.$('.task-title .title').text().trim(), 'Original title #12', 'The original title is right');

  this.$('.task-title .edit').click();
  this.$('.task-title input[name=title]').val('Edited title').trigger('change');
  this.$('.task-title .save').click();

  assert.equal(this.$('.task-title .title').text().trim(), 'Edited title #12', 'The tile title is saved');
});

// test('it resets the input element when editing is cancelled and then restarted', function(assert) {
//   assert.expect(1);
//   this.set('task', mockTask);
//   this.render(hbs`{{task-title task=task}}`);
//   this.$('.task-title .edit').click();
//   this.$('.task-title input[name=title]').val('Edited title').trigger('change');
//   this.$('.task-title .cancel').click();
//   this.$('.task-title .edit').click();
//   assert.equal(this.$('.task-title input[name=title]').val(), 'Original title', 'Input is back to the original value');
// });
