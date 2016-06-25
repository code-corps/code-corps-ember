import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Ember from 'ember';

let application;

function createProject() {
  // server.create uses factories. server.schema.<obj>.create does not
  let project = server.create('project');

  // need to assign polymorphic properties explicitly
  // TODO: see if it's possible to override models so we can do this in server.create<<<<<<< HEAD
  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: 'test_organization' });
  let organization = server.schema.organizations.create({ slug: 'test_organization' });
  sluggedRoute.owner = organization;
  sluggedRoute.save();

  project.organization = organization;
  project.save();
  return project;
}

moduleForAcceptance('Acceptance: Contributors', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('when not an admin on the project', function(assert) {
  assert.expect(1);

  let project = createProject();

  let user = server.create('user');
  server.create('organizationMembership', {
    member: user,
    organization: project.organization,
    role: 'contributor'
  });

  let contributorsURL = `/${project.organization.slug}/${project.slug}/settings/contributors`;

  authenticateSession(application, { user_id: user.id });

  visit(contributorsURL);

  andThen(function() {
    assert.equal(currentURL(), '/projects');
  });
});

test('when only the owner is a contributor', function(assert) {
  assert.expect(9);

  let project = createProject();
  let user = server.create('user');
  server.create('organizationMembership', {
    member: user,
    organization: project.organization,
    role: 'owner'
  });

  let contributorsURL = `/${project.organization.slug}/${project.slug}/settings/contributors`;

  authenticateSession(application, { user_id: user.id });

  visit(contributorsURL);

  andThen(function() {
    assert.equal(currentURL(), contributorsURL);

    assert.equal(find('.contributors-list:eq(0) .contributors-list-empty').length, 1);
    assert.equal(find('.contributors-list:eq(1) .contributors-list-empty').length, 0);
    assert.equal(find('.contributors-list:eq(2) .contributors-list-empty').length, 1);
    assert.equal(find('.contributors-list:eq(3) .contributors-list-empty').length, 1);

    assert.equal(find('.contributors-list:eq(0) .member-list-item').length, 0);
    assert.equal(find('.contributors-list:eq(1) .member-list-item').length, 1);
    assert.equal(find('.contributors-list:eq(2) .member-list-item').length, 0);
    assert.equal(find('.contributors-list:eq(3) .member-list-item').length, 0);
  });
});

test('when there are multiple contributors', function(assert) {
  assert.expect(16);

  let project = createProject();
  let user = server.create('user');
  server.create('organizationMembership', {
    member: user,
    organization: project.organization,
    role: 'owner'
  });

  server.create('organizationMembership', {
    member: server.create('user'),
    organization: project.organization,
    role: 'admin'
  });

  server.create('organizationMembership', {
    member: server.create('user'),
    organization: project.organization,
    role: 'pending'
  });

  server.create('organizationMembership', {
    member: server.create('user'),
    organization: project.organization,
    role: 'pending'
  });

  server.create('organizationMembership', {
    member: server.create('user'),
    organization: project.organization,
    role: 'contributor'
  });

  let contributorsURL = `/${project.organization.slug}/${project.slug}/settings/contributors`;

  authenticateSession(application, { user_id: user.id });

  visit(contributorsURL);

  andThen(function() {
    assert.equal(currentURL(), contributorsURL);

    assert.equal(find('.project-menu .contributors .info').text().trim(), '2 pending');

    assert.equal(find('.contributors-list:eq(0) .contributors-list-empty').length, 0);
    assert.equal(find('.contributors-list:eq(1) .contributors-list-empty').length, 0);
    assert.equal(find('.contributors-list:eq(2) .contributors-list-empty').length, 0);
    assert.equal(find('.contributors-list:eq(3) .contributors-list-empty').length, 0);

    assert.equal(find('.contributors-list:eq(0) .member-list-item').length, 2);
    assert.equal(find('.contributors-list:eq(1) .member-list-item').length, 1);
    assert.equal(find('.contributors-list:eq(2) .member-list-item').length, 1);
    assert.equal(find('.contributors-list:eq(3) .member-list-item').length, 1);

    click('.contributors-list:eq(0) .member-list-item:eq(0) button.default');
  });

  andThen(function() {
    assert.equal(find('.project-menu .contributors .info').text().trim(), '1 pending');
    assert.equal(find('.contributors-list:eq(0) .member-list-item').length, 1);
    assert.equal(find('.contributors-list:eq(3) .member-list-item').length, 2);

    window.confirm = function() { return true; };
    click('.contributors-list:eq(0) .member-list-item:eq(0) button.danger');
  });

  andThen(function() {
    assert.equal(find('.project-menu .contributors .info').length, 0);
    assert.equal(find('.contributors-list:eq(0) .member-list-item').length, 0);
    assert.equal(find('.contributors-list:eq(3) .member-list-item').length, 2);
  });
});
