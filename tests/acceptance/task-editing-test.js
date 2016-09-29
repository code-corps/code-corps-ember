import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Task Editing', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Task editing requires logging in', (assert) => {
  assert.expect(4);

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  let user = server.schema.users.create({ username: 'test_user' });
  let task = project.createTask({ title: "Test title", body: "Test body", taskType: "issue", number: 1 });
  task.user = user;
  task.save();

  visit(`/${organization.slug}/${project.slug}/tasks/${task.number}`);

  andThen(() => {
    assert.equal(find('.task-body .edit').length, 0, 'Body edit button is not rendered');
    assert.equal(find('.task-title .edit').length, 0, 'Title edit button is not rendered');

    authenticateSession(application, { user_id: user.id });
    visit(`/${organization.slug}/${project.slug}/tasks/${task.number}`);
  });

  andThen(() => {
    assert.equal(find('.task-body .edit').length, 1, 'Body edit button is rendered after authenticating');
    assert.equal(find('.task-title .edit').length, 1, 'Title edit button is rendered after authenticating');
  });
});

test('A task body can be edited on its own', (assert) => {
  assert.expect(3);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  let task = project.createTask({ title: "Test title", body: "Test body", taskType: "issue", number: 1 });
  task.user = user;
  task.save();

  visit(`/${organization.slug}/${project.slug}/tasks/${task.number}`);

  andThen(() => {
    click('.task-body .edit');
  });

  andThen(() => {
    fillIn('textarea[name=markdown]', 'Some type of markdown');
    click('.preview');
  });

  andThen(() => {
    assert.equal(find('.body-preview').html(), '<p>Some type of markdown</p>', 'The preview renders');
    click('.save');
  });

  andThen(() => {
    assert.equal(find('.task-body .edit').length, 1, 'Succesful save of body switches away from edit mode');
    assert.equal(find('.task-body .comment-body').html(), '<p>Some type of markdown</p>', 'The new task body is rendered');
  });
});

test('A task title can be edited on its own', (assert) => {
  assert.expect(4);

  let user = server.schema.users.create({ username: 'test_user' });
  authenticateSession(application, { user_id: user.id });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project').id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  let task = project.createTask({ title: "Test title", body: "Test body", taskType: "issue", number: 1 });
  task.user = user;
  task.save();

  visit(`/${organization.slug}/${project.slug}/tasks/${task.number}`);

  andThen(() => {
    click('.task-title .edit');
  });

  andThen(() => {
    assert.equal(find('.task-title input[name=title]').val(), 'Test title', 'The original title is correct');
    fillIn('.task-title input[name=title]', 'Edited title');
    click('.task-title .save');
  });

  andThen(() => {
    assert.equal(find('.task-title .edit').length, 1, 'Sucessful save of title switches away from edit mode');
    assert.equal(find('.task-title .title').text().trim(), 'Edited title #1', 'The new title is rendered');
    assert.equal(server.schema.tasks.find(task.id).title, 'Edited title', 'The title was updated in the database');
  });
});

// NOTE: Commented out due to comment user mentions being disabled until reimplemented in phoenix
/*
test('Mentions are rendered during editing in preview mode', (assert) => {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project').id;

  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

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

  visit(`/${organization.slug}/${project.slug}/tasks/${task.number}`);

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

  let sluggedRoute = server.create('slugged-route', { slug: 'test' });
  let organization = sluggedRoute.createOrganization({ slug: 'test' });
  sluggedRoute.save();

  let project = server.create('project', { organization: organization });

  let task = server.schema.create('task', {
    type: 'issue',
    status: 'open',
    number: 1,
    user: user,
    project: project
  });

  visit(`/${organization.slug}/${project.slug}/tasks/${task.number}`);

  andThen(() => {
    click('.task-status-button [name=close]');
  });

  andThen(() => {
    task.reload();
    assert.equal(task.status, 'closed');
    click('.task-status-button [name=open]');
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

  let sluggedRoute = server.create('slugged-route', { slug: 'test' });
  let organization = sluggedRoute.createOrganization({ slug: 'test' });
  sluggedRoute.save();

  let project = server.create('project', { organization: organization });

  let task = server.schema.create('task', {
    type: 'issue',
    status: 'open',
    number: 1,
    project: project
  });

  server.schema.create('organization-membership', { organization: organization, member:  user, role: 'admin' });

  visit(`/${organization.slug}/${project.slug}/tasks/${task.number}`);

  andThen(() => {
    click('.task-status-button [name=close]');
  });

  andThen(() => {
    task.reload();
    assert.equal(task.status, 'closed');
    click('.task-status-button [name=open]');
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

  let sluggedRoute = server.create('slugged-route', { slug: 'test' });
  let organization = sluggedRoute.createOrganization({ slug: 'test' });
  sluggedRoute.save();

  let project = server.create('project', { organization: organization });

  let task = server.schema.create('task', {
    type: 'issue',
    status: 'open',
    number: 1,
    project: project
  });

  visit(`/${organization.slug}/${project.slug}/tasks/${task.number}`);

  andThen(() => {
    assert.equal(find('.task-status-button [name=close]').length, 0, 'The close button is not rendered');
  });
});
