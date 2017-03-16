import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import projectSettingsPage from '../pages/project/settings/profile';

moduleForAcceptance('Acceptance | Project Settings - Profile');

test('it requires authentication', function(assert) {
  assert.expect(1);

  let project = server.create('project');

  projectSettingsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('it allows editing of project profile for owners', function(assert) {
  assert.expect(5);

  let { project, user } = server.create('project-user', { role: 'owner' });

  authenticateSession(this.application, { user_id: user.id });

  projectSettingsPage.visit({
    organization: project.organization.slug,
    project: project.slug
  });

  andThen(() => {
    let form = projectSettingsPage.projectSettingsForm;
    form.title.fillIn('Edited Project');
    form.description.fillIn('Lorem edit');
    form.website.fillIn('https://www.testproject.org');
    form.save.click();
  });

  let done = assert.async();

  server.patch('/projects/1', function(schema, request) {
    let attrs = this.normalizedRequestAttrs();

    assert.equal(attrs.title, 'Edited Project');
    assert.equal(attrs.description, 'Lorem edit');
    assert.equal(attrs.website, 'https://www.testproject.org');
    done();

    return this._getJsonApiDocForRequest(request, 'project');
  });

  andThen(() => {
    assert.ok(projectSettingsPage.successAlert.isVisible);
    assert.equal(projectSettingsPage.successAlert.message, 'Project updated successfully');
  });
});

test("it allows editing of project's image for owners", function(assert) {
  assert.expect(3);
  let done = assert.async();

  let droppedImageString = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  let { project, user } = server.create('project-user', { role: 'owner' });

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

test("it allows editing of project's skills for owners", function(assert) {
  assert.expect(4);
  let done = assert.async();

  server.create('skill', { title: 'Ruby' });
  let { project, user } = server.create('project-user', { role: 'owner' });

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
