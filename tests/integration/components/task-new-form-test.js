import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import PageObject from 'ember-cli-page-object';
import taskNewFormComponent from 'code-corps-ember/tests/pages/components/task-new-form';

let page = PageObject.create(taskNewFormComponent);

const { Object, set, setProperties } = Ember;

function renderPage() {
  page.render(hbs`{{task-new-form task=task placeholder=placeholder save=(action saveHandler task)}}`);
}

function setHandler(context, saveHandler = function() {}) {
  context.set('saveHandler', saveHandler);
}

moduleForComponent('task-new-form', 'Integration | Component | task new form', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders proper ui elements, properly bound', function(assert) {
  assert.expect(3);

  let task = {
    title: 'A task',
    markdown: 'A body'
  };

  let placeholder = 'Test placeholder';

  setProperties(this, { placeholder, task });

  renderPage();

  assert.equal(page.title.value, 'A task', 'Title is properly bound and rendered.');
  assert.equal(page.markdown.value, 'A body', 'Markdown content is properly bound and rendered.');
  assert.equal(page.markdown.placeholder, placeholder, 'Placeholder attribute is properly bound and rendered.');
});

test('it triggers an action when the task is saved', function(assert) {
  assert.expect(3);

  let taskList = Object.create({ id: 1, inbox: true, name: 'Inbox' });
  let task = Object.create({ id: 1, taskList });

  set(this, 'task', task);
  setHandler(this, (task) => {
    assert.ok(true, 'Action has been called');
    assert.equal(task.id, 1, 'Task parameter has been passed in');
    assert.equal(task.taskList, taskList, 'Task list has been passed in');
  });

  renderPage();

  page.saveButton.click();
});
