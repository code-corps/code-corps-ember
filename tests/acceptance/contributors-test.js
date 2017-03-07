import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from '../pages/contributors';

function buildURLParts(project_organization_slug, project_slug) {
  return {
    args: {
      project_organization_slug,
      project_slug
    },
    url: `/${project_organization_slug}/${project_slug}/settings/contributors`
  };
}

moduleForAcceptance('Acceptance: Contributors');

test('Requires user to be project owner to visit.', function(assert) {
  assert.expect(1);

  let project = server.create('project');

  let user = server.create('user');

  server.create('projectUser', { user, project, role: 'contributor' });

  let contributorURLParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(this.application, { user_id: user.id });

  page.visit(contributorURLParts.args);

  andThen(function() {
    let projectUrl = `/${project.organization.slug}/${project.slug}`;
    assert.equal(currentURL(), projectUrl);
  });
});

test('Lists owner when owner is the only member.', function(assert) {
  assert.expect(9);

  let project = server.create('project');
  let user = project.createOwner();

  server.create('projectUser', { user, project, role: 'owner' });

  let contributorURLParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(this.application, { user_id: user.id });

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

test('Lists multiple contributors if they exists.', function(assert) {
  assert.expect(16);

  let project = server.create('project');
  let user = project.createOwner();

  server.create('projectUser', { user, project, role: 'owner' });
  server.create('projectUser', { project, role: 'admin' });
  server.create('projectUser', { project, role: 'contributor' });
  server.createList('projectUser', 2, { project, role: 'pending' });

  let contributorURLParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(this.application, { user_id: user.id });

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
