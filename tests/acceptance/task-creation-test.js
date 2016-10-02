import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';
import loginPage from '../pages/login';
import projectTasksPage from '../pages/project-tasks';

let application;

module('Acceptance: Task Creation', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Creating a task requires logging in', (assert) => {
  assert.expect(2);
  // server.create uses factories. server.schema.<obj>.create does not
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let organization = server.schema.organizations.create({slug: 'test_organization'});
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();
  projectTasksPage.visitIndex({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksPage.clickNewTask();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'Got redirected to login');

    server.schema.users.create({ id: 1, email: 'volunteers@codecorps.org' });
    loginPage.form.loginSuccessfully();
  });

  andThen(() => {
    assert.equal(currentURL(), `/${organization.slug}/${project.slug}/tasks/new`);
  });
});

test('A task can be successfully created', (assert) => {
  assert.expect(9);
  let user = server.schema.users.create({ username: 'test_user' });

  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });
  projectTasksPage.visitIndex({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksPage.clickNewTask();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.tasks.new', 'Button takes us to the proper route');
    assert.equal(find('[name=task-type]').val(), 'issue', 'Has the right default task type');
    projectTasksPage.taskTitle('A task title').taskMarkdown('A task body').taskType('idea').clickSubmit();
  });

  andThen(() => {
    assert.equal(server.schema.tasks.all().models.length, 1, 'A task has been created');

    let task = server.schema.tasks.all().models[0];

    assert.equal(task.title, 'A task title');
    assert.equal(task.markdown, 'A task body');
    console.log(task);
    assert.equal(task.taskType, 'idea');

    assert.equal(task.userId, user.id, 'The correct user was assigned');
    assert.equal(task.projectId, project.id, 'The correct project was assigned');

    assert.equal(currentRouteName(), 'project.tasks.task', 'We got redirected to the task route');
  });

  // TODO: Make sure we got redirected to the task route and task is properly rendered
});

test('Task preview works during creation', (assert) => {
  assert.expect(1);

  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not

  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });

  projectTasksPage.visitNew({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksPage.taskMarkdown('Some type of markdown');
    projectTasksPage.clickPreviewTask();
  });

  andThen(() => {
    assert.equal(projectTasksPage.previewBody.text, 'Some type of markdown', 'The preview is rendered');
  });
});

// NOTE: Commented out due to comment user mentions being disabled until reimplemented in phoenix
/*test('Task preview during creation renders user mentions', (assert) => {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  let organization = server.create('organization');
  let sluggedRoute = server.create('sluggedRoute', { slug: organization.slug });
  let project = server.create('project');

  sluggedRoute.organization = organization;
  sluggedRoute.save();

  project.organization = organization;
  project.save();

  let user1 = server.create('user');
  let user2 = server.create('user');
  let markdown = `Mentioning @${user1.username} and @${user2.username}`;
  const expectedBody = `Mentioning @${user1.username} and @${user2.username}`;
  projectTasksPage.visitNew({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksPage.taskMarkdown(markdown);
    projectTasksPage.clickPreviewTask();

    andThen(() => {
      assert.equal(projectTasksPage.previewBody.text, expectedBody, 'The mentions render');
    });
  });
});*/

test('When task creation succeeeds, the user is redirected to the task page for the new task', (assert) => {
  assert.expect(2);
  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });

  projectTasksPage.visitIndex({ organization: organization.slug, project: project.slug });

  andThen(() => projectTasksPage.clickNewTask());

  andThen(() => {
    projectTasksPage.taskTitle('A task title').taskMarkdown('A task body').taskType('Task').clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.tasks.task', 'Got redirected to the correct route');
    assert.equal(server.schema.tasks.all().models.length, 1, 'A new task got created');
  });
});

test('When task creation fails due to validation, validation errors are displayed', (assert) => {
  assert.expect(1);
  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not

  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });

  projectTasksPage.visitIndex({ organization: organization.slug, project: project.slug });

  andThen(() => projectTasksPage.clickNewTask());

  andThen(() => {
    let taskCreationDone = assert.async();
    server.post('/tasks', function() {
      taskCreationDone();
      return new Mirage.Response(422, {}, {
        errors: [
          {
            id: "VALIDATION_ERROR",
            source: { pointer: "data/attributes/title" },
            detail:"is invalid",
            status: 422
          },
          {
            id:"VALIDATION_ERROR",
            source: { pointer: "data/attributes/markdown" },
            detail: "can't be blank",
            status: 422
          },
          {
            id: "VALIDATION_ERROR",
            source: { pointer: "data/attributes/task-type" },
            detail: "is invalid",
            status: 422
          },
          {
            id: "VALIDATION_ERROR",
            source: { pointer: "data/attributes/task-type" },
            detail: "can only be one of the specified values",
            status: 422
          }
      ]});
    });
    projectTasksPage.clickSubmit();
  });

  andThen(() => assert.equal(projectTasksPage.errors().count, 4));
});

test('When task creation fails due to non-validation issues, the error is displayed', (assert) => {
  assert.expect(2);

  let user = server.schema.users.create({ username: 'test_user' });

  // server.create uses factories. server.schema.<obj>.create does not
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let projectId = server.create('project', { slug: 'test_project' }).id;

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  let project = server.schema.projects.find(projectId);
  project.organization = organization;
  project.save();

  authenticateSession(application, { user_id: user.id });

  projectTasksPage.visitIndex({ organization: organization.slug, project: project.slug });

  andThen(() => {
    projectTasksPage.clickNewTask();
  });

  andThen(() => {
    let taskCreationDone = assert.async();
    server.post('/tasks', () => {
      taskCreationDone();
      return new Mirage.Response(400, {}, {
        errors: [
          {
            id: "UNKNOWN ERROR",
            title: "An unknown error",
            detail:"Something happened",
            status: 400
          }
        ]
      });
    });
    projectTasksPage.clickSubmit();
  });

  andThen(() => {
    assert.equal(projectTasksPage.errors().count, 1);
    assert.equal(projectTasksPage.errors().contains('An unknown error: Something happened', 'The error is messaged'), true);
  });
});
