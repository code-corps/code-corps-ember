import { get, set, setProperties } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';
import PageObject from 'ember-cli-page-object';
import taskNewFormComponent from 'code-corps-ember/tests/pages/components/task-new-form';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import setupSession from 'ember-simple-auth/initializers/setup-session';
import setupSessionService from 'ember-simple-auth/initializers/setup-session-service';

let page = PageObject.create(taskNewFormComponent);

function renderPage() {
  page.render(hbs`
    {{task-new-form
      githubRepos=githubRepos
      placeholder=placeholder
      save=(action saveHandler task)
      selectedRepo=selectedRepo
      task=task
    }}
  `);
}

function setHandler(context, saveHandler = function() {}) {
  context.set('saveHandler', saveHandler);
}

moduleForComponent('task-new-form', 'Integration | Component | task new form', {
  integration: true,
  beforeEach() {
    setHandler(this);
    setupSession(this.registry);
    setupSessionService(this.registry);
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
  page.markdown.as((markdown) => {
    assert.equal(markdown.value, 'A body', 'Markdown content is properly bound and rendered.');
    assert.equal(markdown.placeholder, placeholder, 'Placeholder attribute is properly bound and rendered.');
  });
});

test('it triggers an action when the task is saved', function(assert) {
  assert.expect(3);

  let taskList = { id: 1, inbox: true, name: 'Inbox' };
  let task = { id: 1, taskList };

  set(this, 'task', task);
  setHandler(this, (task) => {
    assert.ok(true, 'Action has been called');
    assert.equal(task.id, 1, 'Task parameter has been passed in');
    assert.equal(task.taskList, taskList, 'Task list has been passed in');
  });

  renderPage();

  page.saveButton.click();
});

test('it changes the selected repo when the select is changed', function(assert) {
  assert.expect(1);

  let [repo1, repo2] = [
    { name: 'Repo 1', id: 1 },
    { name: 'Repo 2', id: 2 }
  ];

  set(this, 'githubRepos', [repo1, repo2]);
  stubService(this, 'current-user', { user: { githubId: '123' } });

  renderPage();

  run(() => page.selectGithubRepo.select.fillIn('Repo 1'));
  run(() => {
    assert.deepEqual(get(this, 'selectedRepo'), repo1);
  });
});

test('it does not render the github repo selection if there are no repos', function(assert) {
  assert.expect(1);
  set(this, 'githubRepos', []);
  renderPage();
  assert.notOk(page.selectGithubRepo.isVisible);
});

test('it renders the connect to github callout if there are repos and the user is not connected to github', function(assert) {
  assert.expect(1);
  set(this, 'githubRepos', [{ id: 1 }]);
  stubService(this, 'current-user', { user: { githubId: null } });
  renderPage();
  assert.ok(page.callout.isVisible);
});

test('it does not render the connect to github callout if there are repos and the user is connected to github', function(assert) {
  assert.expect(1);
  set(this, 'githubRepos', [{ id: 1 }]);
  stubService(this, 'current-user', { user: { githubId: '123' } });
  renderPage();
  assert.notOk(page.callout.isVisible);
});

test('it does not render the connect to github callout if there are no repos and the user is not connected to github', function(assert) {
  assert.expect(1);
  set(this, 'githubRepos', []);
  stubService(this, 'current-user', { user: { githubId: null } });
  renderPage();
  assert.notOk(page.callout.isVisible);
});
