import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import projectAboutPage from '../pages/project/about';

moduleForAcceptance('Acceptance | Project - About');

test('When unauthenticated, and project has no long description, it shows proper UI', function(assert) {
  assert.expect(2);
  let project = server.create('project', {
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
  });
});

test('When unauthenticated, and project has long description, it shows the project long description', function(assert) {
  assert.expect(2);

  let project = server.create('project', {
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
  assert.expect(4);

  let project = server.create('project', {
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
    projectAboutPage.projectLongDescription.fillInTextarea('A new body').clickSave();
  });

  andThen(() => {
    project.reload();
    assert.equal(project.longDescriptionMarkdown, 'A new body');
    assert.equal(project.longDescriptionBody, '<p>A new body</p>');
    assert.equal(projectAboutPage.projectLongDescription.longDescription.paragraph.text, project.longDescriptionMarkdown, 'The body is rendered');
    assert.ok(projectAboutPage.projectLongDescription.edit.isVisible, 'We can edit the description again');
  });
});

test('When authenticated as owner, and project has long description, it allows editing it', function(assert) {
  assert.expect(4);

  let project = server.create('project', {
    longDescriptionBody: 'A body',
    longDescriptionMarkdown: 'A body'
  });

  let { user } = server.create('project-user', { project, role: 'owner' });

  authenticateSession(this.application, { user_id: user.id });

  projectAboutPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectAboutPage.projectLongDescription.clickEdit().fillInTextarea('An edited body').clickSave();
  });

  andThen(() => {
    project.reload();
    assert.equal(project.longDescriptionMarkdown, 'An edited body');
    assert.equal(project.longDescriptionBody, '<p>An edited body</p>');
    assert.equal(projectAboutPage.projectLongDescription.longDescription.paragraph.text, project.longDescriptionMarkdown, 'The body is rendered');
    assert.ok(projectAboutPage.projectLongDescription.edit.isVisible, 'We can edit the description again');
  });
});

test('Does not show donation progress sidebar if donations are not active', function(assert) {
  assert.expect(1);

  let user = server.create('user');

  let project = server.create('project', { donationsActive: false });

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
  assert.expect(2);

  let user = server.create('user');

  let project = server.create('project', {
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
    projectAboutPage.donationStatus.becomeADonor.clickButton();
    projectAboutPage.donationStatus.createDonation.setTo15.clickButton();
    projectAboutPage.donationStatus.createDonation.clickContinue();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.donate', 'App transitioned to the donate route.');
    let expectedURL = `/${project.organization.slug}/${project.slug}/donate?amount=15`;
    assert.equal(currentURL(), expectedURL, 'URL contains amount as query parameter.');
  });
});
