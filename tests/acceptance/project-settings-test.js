import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';
import projectSettingsPage from '../pages/project/settings/profile';

moduleForAcceptance('Acceptance | Project Settings - Profile');

test('it requires authentication', function(assert) {
  assert.expect(1);

  let project = createProjectWithSluggedRoute();

  projectSettingsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('it allows editing of project profile', function(assert) {
  assert.expect(4);

  let user = server.create('user');
  let project = createProjectWithSluggedRoute();
  server.create('organizationMembership', {
    member: user,
    organization: project.organization,
    role: 'admin'
  });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectSettingsPage.projectSettingsForm
      .title('Edited Project')
      .description('Lorem edit')
      .clickSave();
  });

  let done = assert.async();

  server.patch('/projects/1', function(schema, request) {
    let attrs = this.normalizedRequestAttrs();

    assert.equal(attrs.title, 'Edited Project');
    assert.equal(attrs.description, 'Lorem edit');
    done();

    return this._getJsonApiDocForRequest(request, 'project');
  });

  andThen(() => {
    assert.ok(projectSettingsPage.successAlert.isVisible);
    assert.equal(projectSettingsPage.successAlert.message, 'Project updated successfully');
  });
});

test("it allows editing of project's image", function(assert) {
  assert.expect(3);
  let done = assert.async();

  let droppedImageString = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  let user = server.create('user');
  let project = createProjectWithSluggedRoute();

  server.create('organizationMembership', {
    member: user,
    organization: project.organization,
    role: 'admin'
  });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectSettingsPage.projectSettingsForm.imageDrop.dropFile(droppedImageString);
  });

  andThen(() => {
    assert.ok(projectSettingsPage.successAlert.isVisible);
    assert.equal(projectSettingsPage.successAlert.message, 'Project icon uploaded successfully');
    assert.equal(projectSettingsPage.projectSettingsForm.imageDrop.backgroundImageData(), `url(${droppedImageString})`);
    done();
  });
});

test("it allows editing of project's skills", function(assert) {
  assert.expect(4);
  let done = assert.async();

  server.create('skill', {
    title: 'Ruby'
  });
  let user = server.create('user');
  let project = createProjectWithSluggedRoute();
  server.create('organizationMembership', {
    member: user,
    organization: project.organization,
    role: 'admin'
  });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    projectSettingsPage.skillsTypeahead.fillIn('ru');
  });

  andThen(() => {
    assert.equal(currentURL(), `${project.organization.slug}/${project.slug}/settings/profile`);
    projectSettingsPage.skillsTypeahead.focus();
    assert.equal(projectSettingsPage.skillsTypeahead.inputItems(0).text, 'Ruby');
    projectSettingsPage.skillsTypeahead.inputItems(0).click();
  });

  andThen(() => {
    assert.equal(projectSettingsPage.projectSkillsList(0).text, 'Ruby');
    projectSettingsPage.projectSkillsList(0).click();
  });

  andThen(() => {
    assert.equal(projectSettingsPage.projectSkillsList().count, 0);
    done();
  });
});
