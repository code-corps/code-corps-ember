import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import projectTasksIndexPage from '../pages/project/tasks/index';

moduleForAcceptance('Acceptance | Project');

test('It renders navigation properly', function(assert) {
  assert.expect(2);

  let project = server.create('project');
  let aboutURL = `/${project.organization.slug}/${project.slug}`;
  let tasksURL = `${aboutURL}/tasks`;

  projectTasksIndexPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(function() {
    assert.equal(projectTasksIndexPage.projectMenu.links(0).href, aboutURL, 'Link to about is properly rendered');
    assert.equal(projectTasksIndexPage.projectMenu.links(1).href, tasksURL, 'Link to tasks is properly rendered');
  });
});

test('The footer and spacer are hidden, the main container is set up for project tasks', function(assert) {
  assert.expect(4);

  let project = server.create('project');

  projectTasksIndexPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(function() {
    assert.equal(currentRouteName(), 'project.tasks.index');
    assert.notOk(projectTasksIndexPage.flexboxSpacer.isVisible, 'The flexbox spacer is hidden');
    assert.notOk(projectTasksIndexPage.footer.isVisible, 'The footer is hidden');
    assert.ok(projectTasksIndexPage.siteContentContainer.isVisible, 'The main container is set up for project tasks');
  });
});

test('Navigation works', function(assert) {
  assert.expect(6);

  let project = server.create('project');

  projectTasksIndexPage.visit({ organization: project.organization.slug, project: project.slug });

  andThen(function() {
    assert.equal(currentRouteName(), 'project.tasks.index');
    assert.ok(projectTasksIndexPage.projectMenu.links(1).isActive, 'Tasks link is active');
    projectTasksIndexPage.projectMenu.links(0).click();
  });
  andThen(() => {
    assert.equal(currentRouteName(), 'project.index');
    assert.ok(projectTasksIndexPage.projectMenu.links(0).isActive, 'About link is active');
    projectTasksIndexPage.projectMenu.links(1).click();
  });
  andThen(() => {
    assert.equal(currentRouteName(), 'project.tasks.index');
    assert.ok(projectTasksIndexPage.projectMenu.links(1).isActive, 'Tasks link is active');
  });
});

test('It renders all the required ui elements for task list', function(assert) {
  assert.expect(1);

  let project = server.create('project');
  server.createList('task', 5, { project });
  let { organization } = project;
  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(function() {
    assert.equal(find('.project__header').length, 1, 'project header component is rendered');
  });
});

test('A user can join the project', function(assert) {
  assert.expect(3);

  let project = server.create('project');
  let { organization } = project;
  let user = server.create('user');

  projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });

  andThen(() => {
    assert.equal(projectTasksIndexPage.projectHeader.signUpLink.text, 'Join project', 'The link to the sign up page is present when logged out');

    authenticateSession(this.application, { user_id: user.id });
    projectTasksIndexPage.visit({ organization: organization.slug, project: project.slug });
  });

  andThen(() => {
    let modalButton = projectTasksIndexPage.projectHeader.projectJoinModal.openButton;
    assert.equal(modalButton.text, 'Join project', 'The button to join is present when logged in');
    modalButton.click();
    projectTasksIndexPage.projectHeader.projectJoinModal.modal.joinProjectButton.click();
  });

  andThen(() => {
    let membership = server.schema.projectUsers.findBy({ userId: user.id,  projectId: project.id, role: 'pending' });
    assert.ok(membership, 'Project membership was created correctly.');
  });
});
