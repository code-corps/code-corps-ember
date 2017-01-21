import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';
import projectTasksIndexPage from '../pages/project/tasks/index';

moduleForAcceptance('Acceptance | Project');

test('It renders navigation properly', function(assert) {
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

test('The footer and spacer are hidden, the main container is set up for project tasks', function(assert) {
  assert.expect(4);

  let project = createProjectWithSluggedRoute();
  let { organization } = project;
  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(function() {
    assert.equal(currentRouteName(), 'project.tasks.index');
    assert.notOk(projectTasksIndexPage.flexboxSpacer.isVisible, 'The flexbox spacer is hidden');
    assert.notOk(projectTasksIndexPage.footer.isVisible, 'The footer is hidden');
    assert.ok(projectTasksIndexPage.mainContainer.isVisible, 'The main container is set up for project tasks');
  });
});

test('Navigation works', function(assert) {
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

test('It renders all the required ui elements for task list', function(assert) {
  assert.expect(1);

  let project = createProjectWithSluggedRoute();
  server.createList('task', 5, { project });
  let { organization } = project;
  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(function() {
    assert.equal(find('.project-details').length, 1, 'project-details component is rendered');
  });
});

test('A user can join the organization of the project', function(assert) {
  assert.expect(4);

  let project = createProjectWithSluggedRoute();
  let projectURL = `/${project.organization.slug}/${project.slug}/`;
  let user = server.create('user');

  visit(projectURL);

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectDetails.signUpLink.text, 'Sign up', 'The link to sign up is present when logged out');

    authenticateSession(this.application, { user_id: user.id });
    visit(projectURL);
  });

  andThen(() => {
    let joinButton = projectTasksIndexPage.projectDetails.joinProjectButton;
    assert.equal(joinButton.text, 'Join project', 'The button to join is present when logged in');
    joinButton.click();
  });

  andThen(() => {
    let joinButton = projectTasksIndexPage.projectDetails.joinProjectButton;
    assert.equal(joinButton.text, 'Membership pending', 'The button to join has changed to pending');
    assert.ok(joinButton.disabled, 'Button should be disabled.');
  });
});
