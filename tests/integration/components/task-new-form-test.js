import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Object,
  Service
} = Ember;

moduleForComponent('task-new-form', 'Integration | Component | task new form', {
  integration: true,
  beforeEach() {
    this.register('service:credentials', Service.extend({ currentUserMembership: null }));
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{task-new-form}}`);

  assert.equal(this.$('.task-new-form').length, 1, 'The component\'s element renders');
});

test('it renders proper ui elements, properly bound', function(assert) {
  assert.expect(8);

  let task = {
    title: 'A task',
    markdown: 'A body',
    taskType: 'idea'
  };

  let placeholder = 'Test placeholder';

  this.set('task', task);
  this.set('placeholder', placeholder);
  this.render(hbs`{{task-new-form task=task placeholder=placeholder}}`);

  assert.equal(this.$('[name=title]').val(), 'A task', 'Title is properly bound and rendered');
  assert.equal(this.$('[name=markdown]').val(), 'A body', 'Markdown content is properly bound and rendered');
  assert.equal(this.$('[name=task-type]').val(), 'idea', 'Task type is properly bound and rendered');
  assert.equal(this.$('textarea').attr('placeholder'), placeholder);
  assert.equal(this.$('.input-group.task-type').hasClass('idea'), true);
  assert.equal(this.$('input[name=submit]').hasClass('idea'), true);
  assert.equal(this.$('input[name=submit]').val(), 'Submit new idea');
  assert.equal(this.$('.editor-with-preview .spinner').length, 0);
});

test('it triggers an action when the task is saved', function(assert) {
  assert.expect(2);

  let task = Object.create({ id: 1 });

  this.set('task', task);
  this.on('saveTask', (task) => {
    assert.ok(true, 'Action has been called');
    assert.equal(task.id, 1, 'Task parameter has been passed in');
  });

  this.render(hbs`{{task-new-form task=task saveTask='saveTask'}}`);

  this.$('[type=submit]').click();
});

test('it renders only idea and issue task type options if user is not at least a contributor to the organization', function(assert) {
  assert.expect(3);

  this.register('service:credentials', Service.extend({
    currentUserMembership: { isContributor: false, isAdmin: false, isOwner: false }
  }));

  this.render(hbs`{{task-new-form task=task placeholder=placeholder}}`);

  assert.equal(this.$('option[value=idea]').length, 1, 'idea option is rendered');
  assert.equal(this.$('option[value=issue]').length, 1, 'issue option is rendered');
  assert.equal(this.$('option[value=task]').length, 0, 'task option is rendered');
});

test('it renders all task type options if user is at least contributor', function(assert) {
  assert.expect(3);

  this.register('service:credentials', Service.extend({
    currentUserMembership: { isContributor: true }
  }));

  this.render(hbs`{{task-new-form task=task placeholder=placeholder}}`);

  assert.equal(this.$('option[value=idea]').length, 1, 'idea option is rendered');
  assert.equal(this.$('option[value=issue]').length, 1, 'issue option is rendered');
  assert.equal(this.$('option[value=task]').length, 1, 'task option is rendered');
});
