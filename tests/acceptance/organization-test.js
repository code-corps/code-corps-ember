import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

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

  visit(organization.slug);
  andThen(() => {
    assert.equal(find('.organization-header').length, 1, 'The organization header component renders');
    assert.equal(find('.project-list').length, 1, 'The projects list component renders');
    assert.equal(find('.organization-members').length, 1, 'The organization members component renders');
    assert.equal(find('h2').text().trim(), 'Test Organization', 'The organization title renders');
    assert.equal(find('.organization-header p').text().trim(), 'Test organization description.', 'The organization description renders');
    assert.equal(find('.project-list .project-item').length, 3, 'The projects render');
    assert.equal(find('.organization-members li').length, 3, 'The members render');
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

  visit(organization.slug);

  andThen(() => {
    assert.ok(find('.organization-menu li a:contains("Projects")').hasClass('active'), 'The organization projects menu is active');
    Ember.run.next(() => {
      click('.organization-menu li a:contains("Settings")');
    });
  });

  andThen(() => {
    assert.ok(find('.organization-menu li a:contains("Settings")').hasClass('active'), 'The organization settings menu is active');
    assert.equal(find('.organization-settings-form').length, 1, 'The organization settings form renders');
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

  visit(organization.slug);

  andThen(() => {
    assert.equal(find('.project-item:eq(0) h4').text().trim(), project.title, 'The project in the list is correct');
    click('.project-item:eq(0) a');
  });

  andThen(() => {
    assert.equal(find('.project-details').length, 1, "The project's details render");
  });
});
