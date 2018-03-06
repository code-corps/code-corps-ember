import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import organizationPage from '../pages/organization';

moduleForAcceptance('Acceptance | Organization');

test("it displays the organization's details", function(assert) {
  assert.expect(5);

  let organization = server.create('organization', { description: 'Test description.' });
  server.create('sluggedRoute', {
    slug: organization.slug,
    organization
  });

  server.createList('project', 3, { organization });

  organizationPage.visitIndex({ organization: organization.slug });
  andThen(() => {
    assert.ok(organizationPage.orgHeader.isVisible, 'The organization header component renders');
    assert.ok(organizationPage.projectList.isVisible, 'The projects list component renders');
    assert.equal(organizationPage.orgTitle.text, organization.name, 'The organization title renders');
    assert.equal(organizationPage.orgDescription.text, organization.description, 'The organization description renders');
    assert.equal(organizationPage.projectListItems.length, 3, 'The projects render');
  });
});

test('an owner can navigate to settings', function(assert) {
  assert.expect(3);

  let organization = server.create('organization');
  let user = organization.createOwner();

  // we assume authenticate session here. specific behavior regarding authentication and
  // showing/hiding of links is handled in the organization-menu component integration test
  authenticateSession(this.application, { user_id: user.id });

  organizationPage.visitIndex({ organization: organization.slug });

  andThen(() => {
    assert.ok(organizationPage.projectsMenuItemIsActive, 'The organization projects menu is active');
    organizationPage.clickSettingsMenuItem();
  });

  andThen(() => {
    assert.ok(organizationPage.settingsMenuItemIsActive, 'The organization settings menu is active');
    assert.ok(organizationPage.settingsForm.isVisible, 'The organization settings form renders');
  });
});

test('anyone can navigate to projects', function(assert) {
  assert.expect(2);

  let organization = server.create('organization');
  let project = server.create('project', { organization });

  // no need to create membership. even non-members should be able to visit
  // organization project list

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  organizationPage.visitIndex({ organization: organization.slug });

  andThen(() => {
    assert.equal(organizationPage.projectListItems.objectAt(0).text, project.title, 'The project in the list is correct');
    organizationPage.projectListItems.objectAt(0).click();
  });

  andThen(() => {
    assert.equal(currentURL(), `/${project.organization.slug}/${project.slug}`, 'Navigating to the project works');
  });
});
