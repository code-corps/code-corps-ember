import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';
import sinon from 'sinon';
import loginPage from 'code-corps-ember/tests/pages/login';
import page from 'code-corps-ember/tests/pages/projects/new';
import { focus } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | Project Creation');

test('Creating a project requires logging in', function(assert) {
  assert.expect(2);

  let organization = server.create('organization');
  page.visit({ organization: organization.slug });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'Got redirected to login');

    let email = 'test@test.com';
    let password = 'password';
    server.create('user', { email, password });

    loginPage.form.loginSuccessfully(email, password);
  });

  andThen(() => {
    assert.equal(currentURL(), `/${organization.slug}/projects/new`);
  });
});

test('Creating a project can fail with validation errors', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let organization = server.create('organization');
  page.visit({ organization: organization.slug });

  andThen(() => {
    let saveDone = assert.async();
    server.post('/projects', function() {
      saveDone();

      return new Mirage.Response(422, {}, {
        errors: [
          {
            source: { pointer: 'data/attributes/categories' },
            detail: 'should have at least 1 item(s)',
            status: 422
          },
          {
            source: { pointer: 'data/attributes/cloudinary-public-id' },
            detail: "can't be blank",
            status: 422
          },
          {
            source: { pointer: 'data/attributes/description' },
            detail: "can't be blank",
            status: 422
          },
          {
            source: { pointer: 'data/attributes/skills' },
            detail: 'should have at least 1 item(s)',
            status: 422
          },
          {
            source: { pointer: 'data/attributes/title' },
            detail: "can't be blank",
            status: 422
          },
          {
            source: { pointer: 'data/attributes/slug' },
            detail: "can't be blank",
            status: 422
          }
        ]
      });
    });
  });

  andThen(() => {
    page.projectForm.clickSubmit();
  });

  andThen(() => assert.equal(page.projectForm.errors().count, 6));
});

test('Creating a project can fail with an unknown error', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let organization = server.create('organization');
  page.visit({ organization: organization.slug });

  andThen(() => {
    let saveDone = assert.async();
    server.post('/projects', function() {
      saveDone();

      return new Mirage.Response(500, {}, {
        errors: [
          {
            title: '500 Internal Server Error',
            detail: '500 Internal Server Error',
            status: 500
          }
        ]
      });
    });
  });

  andThen(() => {
    page.projectForm.clickSubmit();
  });

  andThen(() => assert.equal(page.flashMessages().count, 1, 'A flash was displayed'));
});

test('A user can copy details from their organization', function(assert) {
  assert.expect(9);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let organization = server.create('organization', { cloudinaryPublicId: '123' });
  page.visit({ organization: organization.slug });

  andThen(() => {
    assert.ok(page.projectForm.callout.isVisible, 'The callout renders when this is the first project.');
    page.projectForm.callout.copyButton.click();
  });

  andThen(() => {
    assert.notOk(page.projectForm.callout.isVisible, 'The callout is hidden after copying.');
    assert.equal(page.projectForm.titleValue, organization.name, 'Copies the organization name for the title.');
    assert.equal(page.projectForm.imageDrop.dropZone.backgroundImageUrl(), organization.iconThumbUrl, 'Copies the organization logo.');
    assert.equal(page.projectForm.slugValue, organization.slug.dasherize(), 'Copies the organization slug.');
    assert.equal(page.projectForm.descriptionValue, organization.description, 'Copies the organization description.');
    page.projectForm.clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.index', 'User was redirected correctly');
    let project = server.schema.projects.findBy({ title: organization.name, description: organization.description });
    assert.ok(project, 'Project was created.');
    assert.ok(project.cloudinaryPublicId, 'Project has image.');
  });
});

test('A user can create a project', function(assert) {
  assert.expect(9);

  server.create('category', { name: 'Technology' });
  server.create('skill', { title: 'Ruby' });

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let droppedImageString = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  let organization = server.create('organization');
  page.visit({ organization: organization.slug });

  andThen(() => {
    page.projectForm.imageDrop.dropZone.dropFile(droppedImageString);
    assert.equal(page.projectForm.imageDrop.dropZone.backgroundImageUrl(), droppedImageString, 'Image dropped successfully');
  });

  andThen(() => {
    page.projectForm.categoryCheckboxes.checkboxes(0).label.click();
  });

  andThen(() => {
    assert.ok(page.projectForm.categoryCheckboxes.checkboxes(0).isChecked, 'The category was added.');

    page.projectForm.skillsTypeahead.searchFor('ru');
  });

  andThen(() => {
    focus('input');
    assert.equal(page.projectForm.skillsTypeahead.dropdown.inputItems(0).text, 'Ruby', 'The text in the typeahead matches the searched text');
    page.projectForm.skillsTypeahead.dropdown.inputItems(0).click();
  });

  andThen(() => {
    assert.equal(page.projectForm.skillsList(0).text, 'Ruby', 'The skill was added to the list');

    page.projectForm
      .inputTitle('Bar')
      .inputDescription('Baz')
      .clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'project.index', 'User was redirected correctly');
    let project = server.schema.projects.findBy({ title: 'Bar', description: 'Baz' });
    assert.ok(project, 'Project was created.');
    assert.ok(project.cloudinaryPublicId, 'Project has image.');

    let projectCategory = server.schema.projectCategories.findBy({ projectId: project.id });
    assert.ok(projectCategory, 'Created the project category.');

    let projectSkill = server.schema.projectSkills.findBy({ projectId: project.id });
    assert.ok(projectSkill, 'Created the project skill.');
  });
});

test('Navigation is successful if user answers positively to prompt', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let organization = server.create('organization');
  page.visit({ organization: organization.slug });

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return true;
  });

  andThen(() => {
    page.navigationMenu.projectsLink.click();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'projects-list', 'Navigation was successful.');
    stub.restore();
  });
});

test('Navigation is aborted if user answers negatively to prompt', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let organization = server.create('organization');
  page.visit({ organization: organization.slug });

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return false;
  });

  andThen(() => {
    page.navigationMenu.projectsLink.click();
  });

  andThen(() => {
    assert.equal(currentURL(), `${organization.slug}/projects/new`);
    stub.restore();
  });
});
