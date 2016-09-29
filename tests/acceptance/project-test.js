import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

function createProject(slug) {
  slug = slug || 'test_organization';

  // server.create uses factories. server.schema.<obj>.create does not
  let project = server.create('project');

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  sluggedRoute.organization = organization;
  sluggedRoute.save();

  project.organization = organization;
  project.save();

  return project;
}

module('Acceptance: Project', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('It renders navigation properly', (assert) => {
  assert.expect(2);

  let project = createProject();
  let aboutURL = `/${project.organization.slug}/${project.slug}`;
  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;
  visit(tasksURL);

  andThen(function() {
    let hrefToAbout = find('.project-menu li:first a').attr('href');
    assert.equal(hrefToAbout, aboutURL, 'Link to about is properly rendered');
    let hrefToTasks = find('.project-menu li:eq(1) a').attr('href');
    assert.equal(hrefToTasks, tasksURL, 'Link to tasks is properly rendered');
  });
});

test('Navigation works', (assert) => {
  assert.expect(6);

  let project = createProject();
  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;
  visit(tasksURL);

  andThen(function() {
    assert.equal(currentRouteName(), 'project.tasks.index');
    assert.ok(find('.project-menu li:eq(1) a.active').length === 1, 'Tasks link is active');
    click('.project-menu li:eq(0) a');
  });
  andThen(() => {
    assert.equal(currentRouteName(), 'project.index');
    assert.ok(find('.project-menu li:eq(0) a.active').length === 1, 'About link is active');
    click('.project-menu li:eq(1) a');
  });
  andThen(() => {
    assert.equal(currentRouteName(), 'project.tasks.index');
    assert.ok(find('.project-menu li:eq(1) a.active').length === 1, 'Tasks link is active');
  });
});

test('It renders all the required ui elements for task list', (assert) => {
  assert.expect(4);

  let project = createProject();
  server.createList('task', 5, { projectId: project.id });
  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;
  visit(tasksURL);

  andThen(function() {
    assert.equal(find('.project-details').length, 1, 'project-details component is rendered');
    assert.equal(find('.project-task-list').length, 1, 'project-task-list component is rendered');
    assert.equal(find('.project-task-list .task-item').length, 5, 'correct number of tasks is rendered');

    let hrefToFirstTask = find('.project-task-list .task-item:first a').attr('href');
    let expectedHrefToFirstTask = `${tasksURL}/0`;

    assert.equal(hrefToFirstTask, expectedHrefToFirstTask, 'Link to specific task is properly rendered');
  });
});

test('Task filtering by type works', (assert) => {
  assert.expect(4);

  let project = createProject();

  // we use server.createList so factories are used in creation
  server.createList('task', 1, { taskType: 'idea', projectId: project.id });
  server.createList('task', 6, { taskType: 'task', projectId: project.id });
  server.createList('task', 3, { taskType: 'issue', projectId: project.id });

  let tasksURL = `${project.organization.slug}/${project.slug}/tasks`;

  visit(tasksURL);

  andThen(() => {
    assert.equal(find('.project-task-list .task-item').length, 10, 'correct number of tasks is rendered');
    click('.filter.ideas');
  });

  andThen(() => {
    assert.equal(find('.project-task-list .task-item').length, 1, 'only ideas are rendered');
    click('.tasks-filters .all a');
    click('.filter.tasks');
  });

  andThen(() => {
    assert.equal(find('.project-task-list .task-item').length, 6, 'only task tasks are rendered');
    click('.tasks-filters .all a');
    click('.filter.issues');
  });

  andThen(() => {
    assert.equal(find('.project-task-list .task-item').length, 3, 'only issues are rendered');
  });
});

test('Task filtering by status works', (assert) => {
  assert.expect(8);

  let project = createProject();
  project.closedTasksCount = 2;
  project.openTasksCount = 4;
  project.save();

  server.createList('task', 2, { taskType: 'issue', status: 'closed', projectId: project.id });
  server.createList('task', 4, { taskType: 'issue', status: 'open', projectId: project.id });

  let tasksURL = `${project.organization.slug}/${project.slug}/tasks`;

  visit(tasksURL);

  andThen(() => {
    assert.equal(find('.statuses .open').text().trim(), '4 Open', 'open count is rendered');
    assert.equal(find('.statuses .closed').text().trim(), '2 Closed', 'closed count is rendered');

    assert.equal(find('.statuses .open').hasClass('active'), true, 'open count has the active class');
    assert.equal(find('.project-task-list .task-item').length, 4, 'open tasks are rendered by default');
    click('.statuses .closed');
  });

  andThen(() => {
    assert.equal(find('.statuses .closed').hasClass('active'), true, 'closed count has the active class');
    assert.equal(find('.project-task-list .task-item').length, 2, 'only closed tasks are rendered');
    click('.statuses .open');
  });

  andThen(() => {
    assert.equal(find('.statuses .open').hasClass('active'), true, 'open count has the active class');
    assert.equal(find('.project-task-list .task-item').length, 4, 'open tasks are rendered');
  });
});

test('Task paging links are correct', (assert) =>  {
  assert.expect(10);

  let project = createProject();

  // we use server.createList so factories are used in creation
  server.createList('task', 20, { taskType: 'idea', projectId: project.id });
  server.createList('task', 20, { taskType: 'task', projectId: project.id });

  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;

  visit(`${tasksURL}?page=2`);

  andThen(() => {
    assert.equal(find('.previous-page').attr('href'), `${tasksURL}`, 'Previous page link links to page 1');
    assert.equal(find('.next-page').attr('href'), `${tasksURL}?page=3`, 'Link to next page links to page 3');
    assert.equal(find('.page.1').attr('href'), `${tasksURL}`, 'Link to page 1 is correct');
    assert.equal(find('.page.2').attr('href'), `${tasksURL}?page=2`, 'Link to page 2 is correct');
    assert.equal(find('.page.3').attr('href'), `${tasksURL}?page=3`, 'Link to page 3 is correct');
    assert.equal(find('.page.4').attr('href'), `${tasksURL}?page=4`, 'Link to page 4 is correct');
    click('.filter.ideas');
  });

  andThen(() => {
    assert.equal(find('.next-page').attr('href'), `${tasksURL}?page=2&taskType=idea`, 'Next page link maintains type filter');
    assert.equal(find('.page.1').attr('href'), `${tasksURL}?taskType=idea`, 'Link to page 1 maintains type filter');
    assert.equal(find('.page.2').attr('href'), `${tasksURL}?page=2&taskType=idea`, 'Link to page 2 maintains type filter');
    click('.page.2');
  });

  andThen(() => {
    assert.equal(find('.previous-page').attr('href'), `${tasksURL}?taskType=idea`, 'Previous page link maintains type filter');
  });
});

test('Paging of tasks works', (assert) => {
  assert.expect(3);

  let project = createProject();

  server.createList('task', 12, { projectId: project.id });

  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;
  visit(tasksURL);

  andThen(() => {
    assert.equal(find('.pager-control').length, 1, 'pager is rendered');
    assert.equal(find('.task-item').length, 10, 'first page of 10 records is rendered');
    click('.pager-control .page.2');
  });

  andThen(() => {
    assert.equal(find('.task-item').length, 2, 'second page of 2 records is rendered');
  });
});

test('Paging and filtering of tasks combined works', (assert) => {
  assert.expect(9);

  let project = createProject();

  server.createList('task', 12, { taskType: 'task', projectId: project.id });
  server.createList('task', 12, { taskType: 'issue', projectId: project.id });

  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;
  visit(tasksURL);

  andThen(() => {
    assert.equal(find('.task-item').length, 10, 'first page of 10 tasks is rendered');
    click('.pager-control .page.2');
  });

  andThen(() => {
    assert.equal(find('.task-item').length, 10, 'second page of 10 tasks is rendered');
    click('.pager-control .page.3');
  });

  andThen(() => {
    assert.equal(find('.task-item').length, 4, 'third page of 4 tasks is rendered');
    click('.filter.tasks');
  });

  andThen(() => {
    assert.equal(find('.task-item.task').length, 10, 'first page of 10 tasks is rendered');
    click('.pager-control .page.2');
  });

  andThen(() => {
    assert.equal(find('.task-item.task').length, 2, 'second page of 2 tasks is rendered');
    assert.equal(find('.task-item').length, 2, 'there are no other tasks rendered');
    click('.tasks-filters .all a');
    click('.filter.issues');
  });

  andThen(() => {
    assert.equal(find('.task-item.issue').length, 10, 'first page of 10 issues is rendered');
    click('.pager-control .page.2');
  });

  andThen(() => {
    assert.equal(find('.task-item.issue').length, 2, 'second page of 2 issues is rendered');
    assert.equal(find('.task-item').length, 2, 'there are no other tasks rendered');
  });
});

test('Paging and filtering uses query parameters', (assert) => {
  assert.expect(6);

  let project = createProject();

  server.createList('task', 22, { taskType: 'task', projectId: project.id });
  server.createList('task', 12, { taskType: 'issue', projectId: project.id });

  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;

  visit(tasksURL);

  andThen(() => {
    assert.equal(currentURL(), `${tasksURL}`);
    click('.pager-control .page.2');
  });

  andThen(() => {
    assert.equal(currentURL(), `${tasksURL}?page=2`, 'Page query param should update');
    click('.filter.tasks');
  });

  andThen(() => {
    assert.equal(currentURL(), `${tasksURL}?taskType=task`, 'We switched type, so page param should reset as well');
    click('.pager-control .page.3');
  });

  andThen(() => {
    assert.equal(currentURL(), `${tasksURL}?page=3&taskType=task`, 'We switched page again, so it should update, while keeping type');
    click('.tasks-filters .all a');
  });

  andThen(() => {
    assert.equal(currentURL(), `${tasksURL}`, 'We reset type to none, so it should be gone from the URL. Page should reset as well');
  });

  visit(`${tasksURL}?page=3&taskType=task`);

  andThen(() => {
    assert.equal(find('.project-task-list .task-item').length, 2, 'Visiting URL via params directly, should fetch the correct tasks');
  });
});

test('A user can join the organization of the project', (assert) => {
  assert.expect(5);

  let project = createProject();
  let projectURL = `/${project.organization.slug}/${project.slug}/`;
  let user = server.create('user');

  visit(projectURL);

  andThen(() => {
    assert.equal(find('.join-project a').text().trim(), 'Sign up', 'The link to sign up is present when logged out');

    authenticateSession(application, { user_id: user.id });
    visit(projectURL);
  });


  andThen(() => {
    assert.equal(find('.join-project button').text().trim(), 'Join project', 'The button to join is present when logged in');
    click('.join-project button');
  });

  let done = assert.async();

  server.post('/organization-memberships', (db, request) => {
    let attributes = JSON.parse(request.requestBody).data.attributes;
    let relationships = JSON.parse(request.requestBody).data.relationships;
    assert.equal(attributes.role, 'pending');
    assert.equal(relationships.member.data.id, user.id);
    assert.equal(relationships.organization.data.id, project.organization.id);
    done();

    return {
      data: {
        id: 1,
        type: "organization-membership",
        attributes: attributes,
        relationships: relationships
      }
    };
  });
});
