import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createProjectWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-project-with-slugged-route';
import page from '../pages/contributors';
import Ember from 'ember';

const { run } = Ember;

let application;

function buildURLParts(project_organization_slug, project_slug) {
  return {
    args: {
      project_organization_slug,
      project_slug
    },
    url: `/${project_organization_slug}/${project_slug}/settings/contributors`
  };
}

moduleForAcceptance('Acceptance: Contributors', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('when not an admin on the project', function(assert) {
  assert.expect(1);

  let project = createProjectWithSluggedRoute();

  let user = server.create('user');
  server.create('organizationMembership', {
    member: user,
    organization: project.organization,
    role: 'contributor'
  });

  let contributorURLParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(application, { user_id: user.id });

  page.visit(contributorURLParts.args);

  andThen(function() {
    assert.equal(currentURL(), '/projects');
  });
});

test('when only the owner is a contributor', function(assert) {
  assert.expect(9);

  let project = createProjectWithSluggedRoute();
  let user = server.create('user');
  server.create('organizationMembership', {
    member: user,
    organization: project.organization,
    role: 'owner'
  });

  let contributorURLParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(application, { user_id: user.id });

  page.visit(contributorURLParts.args);

  andThen(function() {
    assert.equal(currentURL(), contributorURLParts.url);

    assert.ok(page.pendingContributors.emptyMessageVisible, 'Pending contributors list is empty');
    assert.notOk(page.owners.emptyMessageVisible, 'Owners list is NOT empty');
    assert.ok(page.admins.emptyMessageVisible, 'Admins list is empty');
    assert.ok(page.others.emptyMessageVisible, 'Others list is empty');

    assert.equal(page.pendingContributors.members().count, 0, 'Pending contributors has no members listed');
    assert.equal(page.owners.members().count, 1, 'Owners has 1 member listed');
    assert.equal(page.admins.members().count, 0, 'Admins has no members listed');
    assert.equal(page.others.members().count, 0, 'Others has no members listed');
  });
});

test('when there are multiple contributors', function(assert) {
  assert.expect(16);

  let project = createProjectWithSluggedRoute();
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

  let contributorURLParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(application, { user_id: user.id });

  page.visit(contributorURLParts.args);

  andThen(function() {
    assert.equal(currentURL(), contributorURLParts.url);

    assert.equal(page.projectMenu.contributors.infoText, '2 pending');

    assert.notOk(page.pendingContributors.emptyMessageVisible, 'Pending contributors list is not empty');
    assert.notOk(page.owners.emptyMessageVisible, 'Owners list is not empty');
    assert.notOk(page.admins.emptyMessageVisible, 'Admins list is not empty');
    assert.notOk(page.others.emptyMessageVisible, 'Others list is not empty');

    assert.equal(page.pendingContributors.members().count, 2, 'Pending contributors has 2 members listed');
    assert.equal(page.owners.members().count, 1, 'Owners has 1 member listed');
    assert.equal(page.admins.members().count, 1, 'Admins has 1 member listed');
    assert.equal(page.others.members().count, 1, 'Others has 1 member listed');

    page.pendingContributors.members(0).approveMembership();
  });

  andThen(function() {
    assert.equal(page.projectMenu.contributors.infoText, '1 pending');
    assert.equal(page.pendingContributors.members().count, 1, 'Pending contributors has 1 member listed');
    assert.equal(page.others.members().count, 2, 'Others has 2 members listed');

    window.confirm = function() {
      return true;
    };
    page.pendingContributors.members(0).denyMembership();
  });

  andThen(function() {
    assert.notOk(page.projectMenu.contributors.infoVisible);
    assert.equal(page.pendingContributors.members().count, 0, 'Pending contributors no members listed');
    assert.equal(page.others.members().count, 2, 'Others has 2 members listed');
  });
});
