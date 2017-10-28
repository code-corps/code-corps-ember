import RSVP from 'rsvp';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/task-title';

let mockCurrentUser = {
  user: {
    id: 1
  }
};

let mockDifferentUser = {
  user: {
    id: 2
  }
};

let mockTask = {
  title: 'Original title',
  body: 'A <strong>body</strong>',
  number: 12,
  user: {
    id: 1
  },
  save() {
    this.set('title', this.get('title'));
    return RSVP.resolve();
  }
};

let page = PageObject.create(component);

moduleForComponent('task-title', 'Integration | Component | task title', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it is not editable if not the right user', function(assert) {
  stubService(this, 'current-user', mockDifferentUser);

  assert.expect(1);
  page.render(hbs`{{task-title}}`);
  assert.equal(this.$('.task-title .edit').length, 0);
});

test('it switches between edit and view mode', function(assert) {
  assert.expect(8);

  stubService(this, 'current-user', mockCurrentUser);

  this.set('task', mockTask);
  page.render(hbs`{{task-title task=task}}`);

  assert.notOk(page.isEditing, 'Component is not in edit mode');
  assert.notOk(page.titleInput.isVisible, 'Input element is not rendered');
  assert.ok(page.title.isVisible, 'Title is rendered');
  page.edit.click();
  assert.ok(page.isEditing, 'Component is in edit mode');
  assert.ok(page.titleInput.isVisible, 'Input element is rendered');
  assert.ok(page.save.isVisible, 'Save button is rendered');
  assert.ok(page.cancel.isVisible, 'Cancel button is rendered');
  page.cancel.click();
  assert.notOk(page.isEditing, 'Component is not in edit mode');
});

test('it saves', function(assert) {
  assert.expect(2);

  stubService(this, 'current-user', mockCurrentUser);

  this.set('task', mockTask);
  this.on('applyEdit', () => {
    return RSVP.resolve();
  });
  page.render(hbs`{{task-title task=task saveTask=(action "applyEdit")}}`);

  assert.equal(page.title.text, 'Original title #12', 'The original title is right');

  page.edit.click();
  page.titleInput.fillIn('Edited title');
  page.save.click();

  assert.equal(page.title.text, 'Edited title #12', 'The new title is saved');
});
