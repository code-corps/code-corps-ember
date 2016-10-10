import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';
import projectTasksIndexPage from '../pages/project/tasks/index';

const { run } = Ember;

let application;

module('Acceptance: Project', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('It renders navigation properly', (assert) => {
  assert.expect(2);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });
  let aboutURL = `/${organization.slug}/${project.slug}`;
  let tasksURL = `${aboutURL}/tasks`;

  andThen(function() {
    assert.equal(projectTasksIndexPage.projectMenu.aboutLink.href, aboutURL, 'Link to about is properly rendered');
    assert.equal(projectTasksIndexPage.projectMenu.tasksLink.href, tasksURL, 'Link to tasks is properly rendered');
  });
});

test('Navigation works', (assert) => {
  assert.expect(6);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(function() {
    assert.equal(currentRouteName(), 'project.tasks.index');
    assert.ok(projectTasksIndexPage.projectMenu.tasksLink.isActive, 'Tasks link is active');
    projectTasksIndexPage.projectMenu.aboutLink.click();
  });
  andThen(() => {
    assert.equal(currentRouteName(), 'project.index');
    assert.ok(projectTasksIndexPage.projectMenu.aboutLink.isActive, 'About link is active');
    projectTasksIndexPage.projectMenu.tasksLink.click();
  });
  andThen(() => {
    assert.equal(currentRouteName(), 'project.tasks.index');
    assert.ok(projectTasksIndexPage.projectMenu.tasksLink.isActive, 'Tasks link is active');
  });
});

test('It renders all the required ui elements for task list', (assert) => {
  assert.expect(4);

  let project = createProjectWithSluggedRoute();
  server.createList('task', 5, { project });
  let { organization } = project;
  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });
  let tasksURL = `/${organization.slug}/${project.slug}/tasks`;

  andThen(function() {
    assert.equal(find('.project-details').length, 1, 'project-details component is rendered');
    assert.equal(projectTasksIndexPage.projectTaskList.isVisible, true, 'project-task-list component is rendered');
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 5, 'correct number of tasks is rendered');

    let expectedHrefToFirstTask = `${tasksURL}/0`;

    assert.equal(projectTasksIndexPage.projectTaskList.taskItems(0).href, expectedHrefToFirstTask, 'Link to specific task is properly rendered');
  });
});

test('Task filtering by type works', (assert) => {
  assert.expect(4);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;

  // we use server.createList so factories are used in creation
  server.createList('task', 1, { taskType: 'idea', project });
  server.createList('task', 6, { taskType: 'task', project });
  server.createList('task', 3, { taskType: 'issue', project });

  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 10, 'correct number of tasks is rendered');
    click('.filter.ideas');
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 1, 'only ideas are rendered');
    click('.tasks-filters .all a');
    click('.filter.tasks');
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 6, 'only task tasks are rendered');
    click('.tasks-filters .all a');
    click('.filter.issues');
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 3, 'only issues are rendered');
  });
});

test('Task filtering by status works', (assert) => {
  assert.expect(8);

  let project = createProjectWithSluggedRoute();
  project.closedTasksCount = 2;
  project.openTasksCount = 4;
  project.save();

  server.createList('task', 2, { taskType: 'issue', status: 'closed', project });
  server.createList('task', 4, { taskType: 'issue', status: 'open', project });

  let tasksURL = `${project.organization.slug}/${project.slug}/tasks`;

  visit(tasksURL);

  andThen(() => {
    assert.equal(find('.statuses .open').text().trim(), '4 Open', 'open count is rendered');
    assert.equal(find('.statuses .closed').text().trim(), '2 Closed', 'closed count is rendered');

    assert.equal(find('.statuses .open').hasClass('active'), true, 'open count has the active class');
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 4, 'open tasks are rendered by default');
    click('.statuses .closed');
  });

  andThen(() => {
    assert.equal(find('.statuses .closed').hasClass('active'), true, 'closed count has the active class');
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 2, 'only closed tasks are rendered');
    click('.statuses .open');
  });

  andThen(() => {
    assert.equal(find('.statuses .open').hasClass('active'), true, 'open count has the active class');
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 4, 'open tasks are rendered');
  });
});

test('Task paging links are correct', (assert) =>  {
  assert.expect(10);

  let project = createProjectWithSluggedRoute();

  // we use server.createList so factories are used in creation
  server.createList('task', 20, { taskType: 'idea', project });
  server.createList('task', 20, { taskType: 'task', project });

  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;

  visit(`${tasksURL}?page=2`);

  andThen(() => {
    assert.equal(projectTasksIndexPage.pagerControl.previousPage.href, `${tasksURL}`, 'Previous page link links to page 1');
    assert.equal(projectTasksIndexPage.pagerControl.nextPage.href, `${tasksURL}?page=3`, 'Link to next page links to page 3');
    assert.equal(projectTasksIndexPage.pagerControl.pages(0).href, `${tasksURL}`, 'Link to page 1 is correct');
    assert.equal(projectTasksIndexPage.pagerControl.pages(1).href, `${tasksURL}?page=2`, 'Link to page 2 is correct');
    assert.equal(projectTasksIndexPage.pagerControl.pages(2).href, `${tasksURL}?page=3`, 'Link to page 3 is correct');
    assert.equal(projectTasksIndexPage.pagerControl.pages(3).href, `${tasksURL}?page=4`, 'Link to page 4 is correct');
    click('.filter.ideas');
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.pagerControl.nextPage.href, `${tasksURL}?page=2&taskType=idea`, 'Next page link maintains type filter');
    assert.equal(projectTasksIndexPage.pagerControl.pages(0).href, `${tasksURL}?taskType=idea`, 'Link to page 1 maintains type filter');
    assert.equal(projectTasksIndexPage.pagerControl.pages(1).href, `${tasksURL}?page=2&taskType=idea`, 'Link to page 2 maintains type filter');
    projectTasksIndexPage.pagerControl.nextPage.click();
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.pagerControl.previousPage.href, `${tasksURL}?taskType=idea`, 'Previous page link maintains type filter');
  });
});

test('Paging of tasks works', (assert) => {
  assert.expect(3);

  let project = createProjectWithSluggedRoute();

  server.createList('task', 12, { project });

  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;
  visit(tasksURL);

  andThen(() => {
    assert.equal(find('.pager-control').length, 1, 'pager is rendered');
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 10, 'first page of 10 records is rendered');
    projectTasksIndexPage.pagerControl.nextPage.click();
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 2, 'second page of 2 records is rendered');
  });
});

test('Paging and filtering of tasks combined works', (assert) => {
  assert.expect(9);

  let project = createProjectWithSluggedRoute();

  server.createList('task', 12, { taskType: 'task', project });
  server.createList('task', 12, { taskType: 'issue', project });

  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;
  visit(tasksURL);

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 10, 'first page of 10 tasks is rendered');
    projectTasksIndexPage.pagerControl.nextPage.click();
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 10, 'second page of 10 tasks is rendered');
    projectTasksIndexPage.pagerControl.nextPage.click();
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 4, 'third page of 4 tasks is rendered');
    click('.filter.tasks');
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.tasks().count, 10, 'first page of 10 tasks is rendered');
    projectTasksIndexPage.pagerControl.nextPage.click();
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.tasks().count, 2, 'second page of 2 tasks is rendered');
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 2, 'there are no other tasks rendered');
    click('.tasks-filters .all a');
    click('.filter.issues');
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.issues().count, 10, 'first page of 10 issues is rendered');
    projectTasksIndexPage.pagerControl.nextPage.click();
  });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectTaskList.issues().count, 2, 'second page of 2 issues is rendered');
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 2, 'there are no other tasks rendered');
  });
});

test('Paging and filtering uses query parameters', (assert) => {
  assert.expect(6);

  let project = createProjectWithSluggedRoute();

  server.createList('task', 22, { taskType: 'task', project });
  server.createList('task', 12, { taskType: 'issue', project });

  let tasksURL = `/${project.organization.slug}/${project.slug}/tasks`;

  visit(tasksURL);

  andThen(() => {
    assert.equal(currentURL(), `${tasksURL}`);
    projectTasksIndexPage.pagerControl.nextPage.click();
  });

  andThen(() => {
    assert.equal(currentURL(), `${tasksURL}?page=2`, 'Page query param should update');
    click('.filter.tasks');
  });

  andThen(() => {
    assert.equal(currentURL(), `${tasksURL}?taskType=task`, 'We switched type, so page param should reset as well');
    projectTasksIndexPage.pagerControl.pages(2).click();
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
    assert.equal(projectTasksIndexPage.projectTaskList.taskItems().count, 2, 'Visiting URL via params directly, should fetch the correct tasks');
  });
});

test('A user can join the organization of the project', (assert) => {
  assert.expect(5);

  let project = createProjectWithSluggedRoute();
  let projectURL = `/${project.organization.slug}/${project.slug}/`;
  let user = server.create('user');

  visit(projectURL);

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectDetails.signUpLink.text, 'Sign up', 'The link to sign up is present when logged out');

    authenticateSession(application, { user_id: user.id });
    visit(projectURL);
  });

  andThen(() => {
    let joinButton = projectTasksIndexPage.projectDetails.joinProjectButton;
    assert.equal(joinButton.text, 'Join project', 'The button to join is present when logged in');
    joinButton.click();
  });

  let done = assert.async();

  server.post('/organization-memberships', (db, request) => {
    let { attributes, relationships } = JSON.parse(request.requestBody).data;
    assert.equal(attributes.role, 'pending');
    assert.equal(relationships.member.data.id, user.id);
    assert.equal(relationships.organization.data.id, project.organization.id);
    done();

    return {
      data: {
        id: 1,
        type: 'organization-membership',
        attributes,
        relationships
      }
    };
  });
});
