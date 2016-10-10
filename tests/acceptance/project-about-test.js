import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createOrganizationWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-organization-with-slugged-route';
import projectAboutPage from '../pages/project/about';

const { run } = Ember;

let application;

module('Acceptance: Project - About', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('When unauthenticated, and project has no long description, it shows proper UI', (assert) => {
  assert.expect(2);
  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', {
    longDescriptionBody: null,
    longDescriptionMarkdown: null,
    organization
  });

  projectAboutPage.visit({
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(projectAboutPage.projectLongDescription.longDescription.isEmpty, true, 'The empty container is shown');
    assert.ok(projectAboutPage.editorWithPreview.isHidden, 'User is not logged in, so they cannot edit the description');
  });
});

test('When unauthenticated, and project has long description, it shows the project long description', (assert) => {
  assert.expect(2);
  let organization = createOrganizationWithSluggedRoute();
  let project = server.create('project', {
    longDescriptionBody: 'A body',
    longDescriptionMarkdown: 'A body',
    organization
  });

  projectAboutPage.visit({
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.ok(projectAboutPage.projectLongDescription.text.indexOf(project.longDescriptionBody) !== -1, 'The body is rendered');
    assert.ok(projectAboutPage.projectLongDescription.editButton.isHidden, 'User is not logged in, so they cannot edit the description');
  });
});

test('When authenticated as admin, and project has no long description, it allows setting it', (assert) => {
  assert.expect(4);

  let user = server.create('user');
  let organization = createOrganizationWithSluggedRoute();
  server.create('organization-membership', { organization, member: user, role: 'admin' });

  let project = server.create('project', {
    longDescriptionBody: null,
    longDescriptionMarkdown: null,
    organization
  });

  authenticateSession(application, { user_id: user.id });

  projectAboutPage.visit({
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectAboutPage.projectLongDescription.textarea('A new body').clickSave();
  });

  andThen(() => {
    project.reload();
    assert.equal(project.longDescriptionMarkdown, 'A new body');
    assert.equal(project.longDescriptionBody, '<p>A new body</p>');
    assert.equal(projectAboutPage.projectLongDescription.longDescription.paragraph.text, project.longDescriptionMarkdown, 'The body is rendered');
    assert.ok(projectAboutPage.projectLongDescription.editButton.isVisible, 'We can edit the description again');
  });
});

test('When authenticated as admin, and project has long description, it allows editing it', (assert) => {
  assert.expect(4);

  let user = server.create('user');
  let organization = createOrganizationWithSluggedRoute();
  server.create('organization-membership', { organization, member: user, role: 'admin' });

  let project = server.create('project', {
    longDescriptionBody: 'A body',
    longDescriptionMarkdown: 'A body',
    organization
  });

  authenticateSession(application, { user_id: user.id });

  projectAboutPage.visit({
    organization: organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectAboutPage.projectLongDescription.clickEdit().textarea('An edited body').clickSave();
  });

  andThen(() => {
    project.reload();
    assert.equal(project.longDescriptionMarkdown, 'An edited body');
    assert.equal(project.longDescriptionBody, '<p>An edited body</p>');
    assert.equal(projectAboutPage.projectLongDescription.longDescription.paragraph.text, project.longDescriptionMarkdown, 'The body is rendered');
    assert.ok(projectAboutPage.projectLongDescription.editButton.isVisible, 'We can edit the description again');
  });
});
