import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import projectAboutPage from '../pages/project/about';

moduleForAcceptance('Acceptance | Project - About');

test('When unauthenticated, and project has no long description, it shows proper UI', function(assert) {
  assert.expect(3);

  let project = server.create('project', {
    approvalRequested: false,
    approved: false,
    longDescriptionBody: null,
    longDescriptionMarkdown: null
  });

  projectAboutPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.ok(projectAboutPage.projectLongDescription.longDescription.isEmpty, 'The empty container is shown');
    assert.ok(projectAboutPage.editorWithPreview.isHidden, 'User is not logged in, so they cannot edit the description');
    assert.notOk(projectAboutPage.projectNotifications.isVisible, 'User is not logged in, so they cannot see any notifications');
  });
});

test('When unauthenticated, and project has long description, it shows the project long description', function(assert) {
  assert.expect(2);

  let project = server.create('project', {
    approved: true,
    longDescriptionBody: 'A body',
    longDescriptionMarkdown: 'A body'
  });

  projectAboutPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.ok(projectAboutPage.projectLongDescription.text.indexOf(project.longDescriptionBody) !== -1, 'The body is rendered');
    assert.ok(projectAboutPage.projectLongDescription.edit.isHidden, 'User is not logged in, so they cannot edit the description');
  });
});

test('When authenticated as owner, and project has no long description, it allows setting it', function(assert) {
  assert.expect(5);

  let project = server.create('project', {
    approvalRequested: false,
    approved: false,
    longDescriptionBody: null,
    longDescriptionMarkdown: null
  });

  let { user } = server.create('project-user', { project, role: 'owner' });

  authenticateSession(this.application, { user_id: user.id });

  projectAboutPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.ok(projectAboutPage.projectNotifications.callout.descriptionNeeded.isVisible, 'The project is notified the description is needed');
    projectAboutPage.projectLongDescription.fillInTextarea('A new body').clickSave();
  });

  andThen(() => {
    assert.equal(project.longDescriptionMarkdown, 'A new body');
    assert.equal(project.longDescriptionBody, '<p>A new body</p>');
    assert.equal(projectAboutPage.projectLongDescription.longDescription.paragraph.text, project.longDescriptionMarkdown, 'The body is rendered');
    assert.ok(projectAboutPage.projectLongDescription.edit.isVisible, 'We can edit the description again');
  });
});

test('When authenticated as owner, and project has long description, it allows editing it', function(assert) {
  assert.expect(4);

  let project = server.create('project', {
    approved: true,
    longDescriptionBody: 'A body',
    longDescriptionMarkdown: 'A body'
  });

  let user = server.create('user');
  server.create('project-user', { project, user, role: 'owner' });

  authenticateSession(this.application, { user_id: user.id });

  projectAboutPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectAboutPage.projectLongDescription
      .clickEdit()
      .fillInTextarea('An edited body')
      .clickSave();
  });

  andThen(() => {
    assert.equal(project.longDescriptionMarkdown, 'An edited body');
    assert.equal(project.longDescriptionBody, '<p>An edited body</p>');
    assert.equal(projectAboutPage.projectLongDescription.longDescription.paragraph.text, project.longDescriptionMarkdown, 'The body is rendered');
    assert.ok(projectAboutPage.projectLongDescription.edit.isVisible, 'We can edit the description again');
  });
});

test('Does not show donation progress sidebar if donations are not active', function(assert) {
  assert.expect(1);

  let user = server.create('user');

  let project = server.create('project', { approved: true, donationsActive: false });

  authenticateSession(this.application, { user_id: user.id });

  projectAboutPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.notOk(projectAboutPage.donationProgress.isVisible, 'The donation progress is not visible.');
  });
});

test('Allows donating to a project from the sidebar', function(assert) {
  assert.expect(1);

  let user = server.create('user');

  let project = server.create('project', {
    approved: true,
    donationsActive: true,
    longDescriptionBody: 'A body',
    longDescriptionMarkdown: 'A body'
  });

  authenticateSession(this.application, { user_id: user.id });

  projectAboutPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectAboutPage.donationStatus.clickLink();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.donate', 'App transitioned to the donate route.');
  });
});

test('When authenticated as owner, shows the project approval notifications', function(assert) {
  assert.expect(3);

  let project = server.create('project', {
    approvalRequested: false,
    approved: false,
    longDescriptionBody: 'A body',
    longDescriptionMarkdown: 'A body'
  });

  let user = server.create('user');
  server.create('project-user', { project, user, role: 'owner' });

  authenticateSession(this.application, { user_id: user.id });

  projectAboutPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.ok(projectAboutPage.projectNotifications.isVisible, 'Project notifications are visible.');
    projectAboutPage.projectNotifications.callout.submitReviewButton.click();
  });

  andThen(() => {
    assert.ok(projectAboutPage.projectNotifications.callout.reviewAdded.isVisible, 'Submitted project for review');
    let project = server.schema.projects.first();
    assert.ok(project.approvalRequested, 'Project has approvalRequested set');
  });
});

test('When authenticated as a normal user, does not show the project approval notifications', function(assert) {
  assert.expect(1);

  let project = server.create('project', {
    approvalRequested: false,
    approved: false
  });

  let user = server.create('user');

  authenticateSession(this.application, { user_id: user.id });

  projectAboutPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.notOk(projectAboutPage.projectNotifications.isVisible, 'Project notifications are not visible.');
  });
});
