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

  let { project, user } = server.create('project-user', { role: 'contributor' });

  let contributorURLParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(this.application, { user_id: user.id });

  page.visit(contributorURLParts.args);

  andThen(function() {
    let projectUrl = `/${project.organization.slug}/${project.slug}`;
    assert.equal(currentURL(), projectUrl);
  });
});

test('Lists owner when owner is the only contributor.', function(assert) {
  assert.expect(9);

  let { project, user } = server.create('project-user', { role: 'owner' });

  let contributorURLParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(this.application, { user_id: user.id });

  page.visit(contributorURLParts.args);

  andThen(function() {
    assert.equal(currentURL(), contributorURLParts.url);

    page.admins.as((users) => {
      assert.ok(users.emptyMessageVisible, 'Admins list is empty');
      assert.equal(users.contributors().count, 0, 'Admins has no users listed');
    });

    page.others.as((users) => {
      assert.ok(users.emptyMessageVisible, 'Others list is empty');
      assert.equal(users.contributors().count, 0, 'Others has no users listed');
    });

    page.owners.as((users) => {
      assert.notOk(users.emptyMessageVisible, 'Owners list is NOT empty');
      assert.equal(users.contributors().count, 1, 'Owners has 1 user listed');
    });

    page.pendingContributors.as((users) => {
      assert.ok(users.emptyMessageVisible, 'Pending contributors list is empty');
      assert.equal(users.contributors().count, 0, 'Pending contributors has no users listed');
    });
  });
});

test('Lists multiple contributors if they exists.', function(assert) {
  assert.expect(16);

  let { project, user } = server.create('project-user', { role: 'owner' });

  server.create('project-user', { project, role: 'admin' });
  server.create('project-user', { project, role: 'contributor' });
  server.createList('project-user', 2, { project, role: 'pending' });

  let contributorURLParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(this.application, { user_id: user.id });

  page.visit(contributorURLParts.args);

  andThen(function() {
    assert.equal(currentURL(), contributorURLParts.url);

    assert.equal(page.projectMenu.contributors.infoText, '2 pending');

    page.admins.as((users) => {
      assert.notOk(users.emptyMessageVisible, 'Admins list is not empty');
      assert.equal(users.contributors().count, 1, 'Admins has 1 user listed');
    });

    page.others.as((users) => {
      assert.notOk(users.emptyMessageVisible, 'Others list is not empty');
      assert.equal(users.contributors().count, 1, 'Others has 1 user listed');
    });

    page.owners.as((users) => {
      assert.notOk(users.emptyMessageVisible, 'Owners list is not empty');
      assert.equal(users.contributors().count, 1, 'Owners has 1 user listed');
    });

    page.pendingContributors.as((users) => {
      assert.notOk(users.emptyMessageVisible, 'Pending contributors list is not empty');
      assert.equal(users.contributors().count, 2, 'Pending contributors has 2 users listed');
      users.contributors(0).approveButton.click();
      users.contributors(0).modal.confirmButton.click();
    });
  });

  andThen(function() {
    assert.equal(page.projectMenu.contributors.infoText, '1 pending');
    assert.equal(page.pendingContributors.contributors().count, 1, 'Pending contributors has 1 user listed');
    assert.equal(page.others.contributors().count, 2, 'Others has 2 users listed');

    page.pendingContributors.contributors(0).denyButton.click();
    page.pendingContributors.contributors(0).modal.confirmButton.click();
  });

  andThen(function() {
    assert.notOk(page.projectMenu.contributors.infoVisible);
    assert.equal(page.pendingContributors.contributors().count, 0, 'Pending contributors no users listed');
    assert.equal(page.others.contributors().count, 2, 'Others has 2 users listed');
  });
});
