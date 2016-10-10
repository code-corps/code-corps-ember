import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createOrganizationWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-organization-with-slugged-route';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';
import taskPage from '../pages/project/tasks/task';

const { run } = Ember;

let application;

module('Acceptance: Task Editing', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('Task editing requires logging in', (assert) => {
  assert.expect(4);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  let user = server.schema.users.create({ username: 'test_user' });
  let task = project.createTask({ title: 'Test title', body: 'Test body', taskType: 'issue', number: 1 });
  task.user = user;
  task.save();

  taskPage.visit({
    organization: organization.slug,
    project: project.slug,
    number: task.number
  });

  andThen(() => {
    assert.notOk(taskPage.taskBody.editButton.isVisible, 'Body edit button is not rendered');
    assert.notOk(taskPage.taskTitle.editButton.isVisible, 'Title edit button is not rendered');

    authenticateSession(application, { user_id: user.id });
    taskPage.visit({
      organization: organization.slug,
      project: project.slug,
      number: task.number
    });
  });

  andThen(() => {
    assert.ok(taskPage.taskBody.editButton.isVisible, 'Body edit button is rendered after authenticating');
    assert.ok(taskPage.taskTitle.editButton.isVisible, 'Title edit button is rendered after authenticating');
  });
});

test('A task body can be edited on its own', (assert) => {
  assert.expect(3);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  let task = project.createTask({ title: 'Test title', body: 'Test body', taskType: 'issue', number: 1 });
  task.user = user;
  task.save();

  taskPage.visit({
    organization: organization.slug,
    project: project.slug,
    number: task.number
  });

  andThen(() => {
    taskPage.taskBody.editButton.click();
  });

  andThen(() => {
    taskPage.editor.fillInMarkdown('Some type of markdown');
    taskPage.editor.previewButton.click();
  });

  andThen(() => {
    assert.equal(taskPage.editor.bodyPreview.text, 'Some type of markdown', 'The preview renders');
    taskPage.clickSave();
  });

  andThen(() => {
    assert.ok(taskPage.taskBody.editButton.isVisible, 'Succesful save of body switches away from edit mode');
    assert.equal(taskPage.taskBody.commentBody.text, 'Some type of markdown', 'The new task body is rendered');
  });
});

test('A task title can be edited on its own', (assert) => {
  assert.expect(4);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  let task = project.createTask({ title: 'Test title', body: 'Test body', taskType: 'issue', number: 1 });
  task.user = user;
  task.save();

  taskPage.visit({
    organization: organization.slug,
    project: project.slug,
    number: task.number
  });

  andThen(() => {
    taskPage.taskTitle.editButton.click();
  });

  andThen(() => {
    assert.equal(taskPage.taskTitle.inputValue, 'Test title', 'The original title is correct');
    taskPage.taskTitle.fillInTitle('Edited title');
    taskPage.taskTitle.saveButton.click();
  });

  andThen(() => {
    assert.ok(taskPage.taskTitle.editButton.isVisible, 'Sucessful save of title switches away from edit mode');
    assert.equal(taskPage.taskTitle.title.text, 'Edited title #1', 'The new title is rendered');
    assert.equal(server.schema.tasks.find(task.id).title, 'Edited title', 'The title was updated in the database');
  });
});

// NOTE: Commented out due to comment user mentions being disabled until reimplemented in phoenix
/*
test('Mentions are rendered during editing in preview mode', (assert) => {
  assert.expect(1);

  let project = createProjectWithSluggedRoute();
  let organization = project.organization;

  let task = project.createTask({
    title: "Test title",
    body: "Test body",
    taskType: "issue",
    number: 1
  });
  task.user = user;
  task.save();

  let user1 = server.create('user');
  let user2 = server.create('user');
  let markdown = `Mentioning @${user1.username} and @${user2.username}`;
  let expectedBody = `<p>Mentioning <a href="/${user1.username}" class="username">@${user1.username}</a> and <a href="/${user2.username}" class="username">@${user2.username}</a></p>`;

  taskPage.visit({
    organization: organization.slug,
    project: project.slug,
    number: task.number
  });

  andThen(() => {
    click('.task-body .edit');
  });

  andThen(() => {
    fillIn('.task-body textarea', markdown);
    click('.preview');
  });

  andThen(() => {
    assert.equal(find('.body-preview').html(), expectedBody, 'The mentions render');
  });
});
*/

test('A task can be opened or closed by the author', (assert) => {
  assert.expect(2);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', { organization });

  let task = server.schema.create('task', {
    type: 'issue',
    status: 'open',
    number: 1,
    user,
    project
  });

  taskPage.visit({
    organization: organization.slug,
    project: project.slug,
    number: task.number
  });

  andThen(() => {
    taskPage.taskStatusButton.close.click();
  });

  andThen(() => {
    task.reload();
    assert.equal(task.status, 'closed');
    taskPage.taskStatusButton.open.click();
  });

  andThen(() => {
    task.reload();
    assert.equal(task.status, 'open');
  });
});

test('A task can be opened or closed by the organization admin', (assert) => {
  assert.expect(2);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', { organization });

  let task = server.schema.create('task', {
    type: 'issue',
    status: 'open',
    number: 1,
    project
  });

  server.schema.create('organization-membership', { organization, member:  user, role: 'admin' });

  taskPage.visit({
    organization: organization.slug,
    project: project.slug,
    number: task.number
  });

  andThen(() => {
    taskPage.taskStatusButton.close.click();
  });

  andThen(() => {
    task.reload();
    assert.equal(task.status, 'closed');
    taskPage.taskStatusButton.open.click();
  });

  andThen(() => {
    task.reload();
    assert.equal(task.status, 'open');
  });
});

test('A task cannot be opened or closed by someone else', (assert) => {
  assert.expect(1);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', { organization });

  let task = server.schema.create('task', {
    type: 'issue',
    status: 'open',
    number: 1,
    project
  });

  taskPage.visit({
    organization: organization.slug,
    project: project.slug,
    number: task.number
  });

  andThen(() => {
    assert.notOk(taskPage.taskStatusButton.close.isVisible, 'The close button is not rendered');
  });
});
