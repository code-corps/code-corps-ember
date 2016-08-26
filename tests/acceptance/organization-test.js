import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import organizationPage from '../pages/organization';

let application;

module('Acceptance: Organization', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("it displays the organization's details", (assert) => {
  assert.expect(7);

  let sluggedRoute = server.schema.sluggedRoutes.create({
    slug: 'test_organization',
  });

  let organization = sluggedRoute.createOwner({
    name: 'Test Organization',
    slug: 'test_organization',
    description: 'Test organization description.'
  }, 'Organization');

  sluggedRoute.save();

  for (let i = 1; i <= 3; i++) {
    server.schema.projects.create({ organization: organization });

    server.schema.organizationMemberships.create({
      member: server.schema.users.create(),
      organization: organization
    });
  }

  organization.save();

  organizationPage.visitIndex({ organization: organization.slug });
  andThen(() => {
    assert.equal(organizationPage.orgHeader.isVisible, true, 'The organization header component renders');
    assert.equal(organizationPage.projectList.isVisible, true, 'The projects list component renders');
    assert.equal(organizationPage.orgMembersSection.isVisible, true, 'The organization members component renders');
    assert.equal(organizationPage.orgTitle.text.trim(), organization.name, 'The organization title renders');
    assert.equal(organizationPage.orgDescription.text.trim(), organization.description, 'The organization description renders');
    assert.equal(organizationPage.projectListItems().count, 3, 'The projects render');
    assert.equal(organizationPage.orgMembers().count, 3, 'The members render');
  });
});

test('an admin can navigate to settings', (assert) => {
  assert.expect(3);

  let sluggedRoute = server.schema.sluggedRoutes.create({
    slug: 'test_organization',
  });

  let organization = sluggedRoute.createOwner({
    name: 'Test Organization',
    slug: 'test_organization',
    description: 'Test organization description.'
  }, 'Organization');
  sluggedRoute.save();

  let user = server.create('user');

  server.create('organization-membership', {
    member: user,
    organization: organization,
    role: 'admin',
  });

  // we assume authenticate session here. specific behavior regarding authentication and
  // showing/hiding of links is handled in the organization-menu component integration test
  authenticateSession(application, { user_id: user.id });

  organizationPage.visitIndex({ organization: organization.slug });

  andThen(() => {
    assert.ok(organizationPage.projectsMenuItemIsActive, 'The organization projects menu is active');
    Ember.run.next(() => {
      organizationPage.clickSettingsMenuItem();
      andThen(() => {
        assert.ok(organizationPage.settingsMenuItemIsActive, 'The organization settings menu is active');
        assert.equal(organizationPage.settingsForm.isVisible, true, 'The organization settings form renders');
      });
    });
  });

});

test('anyone can navigate to projects', (assert) => {
  assert.expect(2);

  let sluggedRoute = server.schema.sluggedRoutes.create({
    slug: 'test_organization',
  });

  let organization = sluggedRoute.createOwner({
    name: 'Test Organization',
    slug: 'test_organization',
    description: 'Test organization description.'
  }, 'Organization');

  sluggedRoute.save();

  let project = server.create('project', {organization: organization});

  organization.save();

  // no need to create membership. even non-members should be able to visit
  // organization project list

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  organizationPage.visitIndex({ organization: organization.slug });

  andThen(() => {
    assert.equal(organizationPage.projectListItems(0).text, project.title, 'The project in the list is correct');
    organizationPage.projectListItems(0).click();
  });

  andThen(() => {
    assert.equal(organizationPage.projectDetails.isVisible, true, "The project's details render");
  });
});
