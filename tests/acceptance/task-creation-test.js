import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';
import Mirage from 'ember-cli-mirage';
import loginPage from '../pages/login';
import projectTasksIndexPage from '../pages/project/tasks/index';
import projectTasksNewPage from '../pages/project/tasks/new';
import sinon from 'sinon';

moduleForAcceptance('Acceptance | Task Creation');

test('Creating a task requires logging in', function(assert) {
  assert.expect(2);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;

  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksIndexPage.clickNewTask();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'Got redirected to login');

    let email = 'test@test.com';
    let password = 'password';
    server.create('user', { email, password });

    loginPage.form.loginSuccessfully(email, password);
  });

  andThen(() => {
    assert.equal(currentURL(), `/${organization.slug}/${project.slug}/tasks/new`);
  });
});

test('A task can be successfully created', function(assert) {
  assert.expect(10);
  let user = server.schema.users.create({ username: 'test_user' });

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  let taskList = project.createTaskList({ inbox: true });

  authenticateSession(this.application, { user_id: user.id });

  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksIndexPage.clickNewTask();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.tasks.new', 'Button takes us to the proper route');
    assert.equal(find('[name=task-type]').val(), 'issue', 'Has the right default task type');

    projectTasksNewPage.taskTitle('A task title')
                       .taskMarkdown('A task body')
                       .taskType('idea');

    projectTasksNewPage.clickSubmit();
  });

  andThen(() => {
    assert.equal(server.schema.tasks.all().models.length, 1, 'A task has been created');

    let [task] = server.schema.tasks.all().models;

    assert.equal(task.title, 'A task title');
    assert.equal(task.markdown, 'A task body');
    assert.equal(task.taskType, 'idea');

    assert.equal(task.userId, user.id, 'The correct user was assigned');
    assert.equal(task.projectId, project.id, 'The correct project was assigned');
    assert.equal(task.taskListId, taskList.id, 'The correct task list was assigned');

    assert.equal(currentRouteName(), 'project.tasks.task', 'We got redirected to the task route');
  });

});

test('Task preview works during creation', function(assert) {
  assert.expect(1);

  let user = server.schema.users.create({ username: 'test_user' });
  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  authenticateSession(this.application, { user_id: user.id });

  projectTasksNewPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksNewPage.taskMarkdown('Some type of markdown');
    projectTasksNewPage.clickPreviewTask();
  });

  andThen(() => {
    assert.equal(projectTasksNewPage.previewBody.text, 'Some type of markdown', 'The preview is rendered');
  });
});

// NOTE: Commented out due to comment user mentions being disabled until reimplemented in phoenix
/* test('Task preview during creation renders user mentions', function(assert) {
  assert.expect(1);

  let project = createProjectWithSluggedRoute();
  let organization = project.organization;
  let user1 = server.create('user');
  let user2 = server.create('user');
  let markdown = `Mentioning @${user1.username} and @${user2.username}`;
  const expectedBody = `Mentioning @${user1.username} and @${user2.username}`;
  projectTasksNewPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksIndexPage.taskMarkdown(markdown);
    projectTasksNewPage.clickPreviewTask();

    andThen(() => {
      assert.equal(projectTasksIndexPage.previewBody.text, expectedBody, 'The mentions render');
    });
  });
});*/

test('When task creation succeeeds, the user is redirected to the task page for the new task', function(assert) {
  assert.expect(2);
  let user = server.schema.users.create({ username: 'test_user' });

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  authenticateSession(this.application, { user_id: user.id });

  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => projectTasksIndexPage.clickNewTask());

  andThen(() => {
    projectTasksNewPage.taskTitle('A task title').taskMarkdown('A task body').taskType('Task').clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.tasks.task', 'Got redirected to the correct route');
    assert.equal(server.schema.tasks.all().models.length, 1, 'A new task got created');
  });
});

test('When task creation fails due to validation, validation errors are displayed', function(assert) {
  assert.expect(1);
  let user = server.schema.users.create({ username: 'test_user' });
  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  authenticateSession(this.application, { user_id: user.id });

  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => projectTasksIndexPage.clickNewTask());

  andThen(() => {
    let taskCreationDone = assert.async();
    server.post('/tasks', function() {
      taskCreationDone();

      return new Mirage.Response(422, {}, {
        errors: [
          {
            id: 'VALIDATION_ERROR',
            source: { pointer: 'data/attributes/title' },
            detail:'is invalid',
            status: 422
          },
          {
            id:'VALIDATION_ERROR',
            source: { pointer: 'data/attributes/markdown' },
            detail: "can't be blank",
            status: 422
          },
          {
            id: 'VALIDATION_ERROR',
            source: { pointer: 'data/attributes/task-type' },
            detail: 'is invalid',
            status: 422
          },
          {
            id: 'VALIDATION_ERROR',
            source: { pointer: 'data/attributes/task-type' },
            detail: 'can only be one of the specified values',
            status: 422
          }
        ] });
    });
    projectTasksNewPage.clickSubmit();
  });

  andThen(() => assert.equal(projectTasksNewPage.errors().count, 4));
});

test('When task creation fails due to non-validation issues, the error is displayed', function(assert) {
  assert.expect(2);

  let user = server.schema.users.create({ username: 'test_user' });

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  authenticateSession(this.application, { user_id: user.id });

  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksIndexPage.clickNewTask();
  });

  andThen(() => {
    let taskCreationDone = assert.async();
    server.post('/tasks', () => {
      taskCreationDone();
      return new Mirage.Response(400, {}, {
        errors: [
          {
            id: 'UNKNOWN ERROR',
            title: 'An unknown error',
            detail:'Something happened',
            status: 400
          }
        ]
      });
    });
    projectTasksNewPage.clickSubmit();
  });

  andThen(() => {
    assert.equal(projectTasksNewPage.errors().count, 1);
    assert.equal(projectTasksNewPage.errors().contains('An unknown error: Something happened', 'The error is messaged'), true);
  });
});

test('Navigating away from task route destroys task with prompt', function(assert) {
  assert.expect(3);

  let user = server.schema.users.create({ username: 'test_user' });

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  project.createTaskList({ inbox: true });

  authenticateSession(this.application, { user_id: user.id });
  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksIndexPage.clickNewTask();
  });

  let stub = sinon.stub(window, 'confirm', () => {
    assert.ok(true, 'Confirmation prompt was called.');
    return true;
  });

  andThen(() => {
    projectTasksNewPage.projectMenu.tasksLink.click();
  });

  andThen(() => {
    assert.equal(
      projectTasksIndexPage.taskBoard.taskLists(0).taskCards().count,
      0,
      'The task was removed from the list.'
    );
    assert.equal(currentRouteName(), 'project.tasks.index', 'Navigation was successful.');
    stub.restore();
  });
});

test('Navigation is aborted if user answers negatively to prompt', function(assert) {
  assert.expect(2);

  let user = server.schema.users.create({ username: 'test_user' });

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  project.createTaskList({ inbox: true });

  authenticateSession(this.application, { user_id: user.id });
  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksIndexPage.clickNewTask();
  });

  let stub = sinon.stub(window, 'confirm', () => {
    assert.ok(true, 'Confirmation prompt was called.');
    return false;
  });

  andThen(() => {
    projectTasksNewPage.projectMenu.tasksLink.click();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.tasks.new', 'Navigation was aborted.');
    stub.restore();
  });
});
