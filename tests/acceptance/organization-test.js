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

  let sluggedRoute = server.schema.sluggedRoute.create({
    slug: 'test_organization',
  });
  let organization = sluggedRoute.createOwner({
    name: 'Test Organization',
    slug: 'test_organization',
    description: 'Test organization description.'
  }, 'Organization');
  sluggedRoute.save();

  for (let i = 1; i <= 3; i++) {
    organization.createProject({
      slug: `test_project_${i}`,
      title: `Test project ${i}`
    });

    organization.createUser({
      username: `username_${i}`
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

test("when unauthenticated you can't navigate to settings", (assert) => {
  assert.expect(1);

  let sluggedRoute = server.schema.sluggedRoute.create({
    slug: 'test_organization',
  });
  let organization = sluggedRoute.createOwner({
    name: 'Test Organization',
    slug: 'test_organization',
    description: 'Test organization description.'
  }, 'Organization');
  sluggedRoute.save();

  visit(organization.slug);
  andThen(() => {
    click('.organization-menu li:eq(1) a');
  });
  andThen(() => {
    assert.equal(find('a.login').text(), 'Sign in', 'Page contains login link');
  });
});

test('when authenticated you can navigate to settings', (assert) => {
  assert.expect(3);

  let sluggedRoute = server.schema.sluggedRoute.create({
    slug: 'test_organization',
  });
  let organization = sluggedRoute.createOwner({
    name: 'Test Organization',
    slug: 'test_organization',
    description: 'Test organization description.'
  }, 'Organization');
  sluggedRoute.save();

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  visit(organization.slug);
  andThen(() => {
    assert.ok(find('.organization-menu li:eq(0) a').hasClass('active'), 'The organization projects menu is active');
    click('.organization-menu li:eq(1) a');
  });
  andThen(() => {
    assert.ok(find('.organization-menu li:eq(1) a').hasClass('active'), 'The organization settings menu is active');
    assert.equal(find('.organization-settings-form').length, 1, 'The organization settings form renders');
  });
});

test('you can navigate to projects', (assert) => {
  assert.expect(2);

  let sluggedRoute = server.schema.sluggedRoute.create({
    slug: 'test_organization',
  });
  let organization = sluggedRoute.createOwner({
    name: 'Test Organization',
    slug: 'test_organization',
    description: 'Test organization description.'
  }, 'Organization');
  sluggedRoute.save();

  organization.createProject({
    title: 'Project Title',
    slug: 'project',
  });

  organization.save();

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  visit(organization.slug);
  andThen(() => {
    assert.equal(find('.project-item:eq(0) h4').text().trim(), 'Project Title', 'The project in the list is correct');
    click('.project-item:eq(0) a');
  });
  andThen(() => {
    assert.equal(find('h2').text().trim(), 'Project Title', 'The project renders');
  });
});

test('you can navigate to members', (assert) => {
  assert.expect(1);

  let sluggedRoute = server.schema.sluggedRoute.create({
    slug: 'test_organization',
  });
  let organization = sluggedRoute.createOwner({
    name: 'Test Organization',
    slug: 'test_organization',
    description: 'Test organization description.'
  }, 'Organization');
  sluggedRoute.save();

  organization.createProject({
    slug: 'test_project_1',
    title: 'Test project 1'
  });

  let user = organization.createUser({
    username: 'username_1',
  });

  organization.save();

  server.schema.sluggedRoute.create({
    slug: 'username_1',
    userId: user.id
  });

  visit(organization.slug);

  andThen(() => {
    click('.organization-members li:eq(0) a');
  });

  andThen(() => {
    assert.equal(currentURL(), '/username_1', 'Navigation works');
  });
});

