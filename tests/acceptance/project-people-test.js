import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from 'code-corps-ember/tests/pages/project/people';
import sinon from 'sinon';

function buildURLParts(project_organization_slug, project_slug) {
  return {
    args: {
      project_organization_slug,
      project_slug
    },
    url: `/${project_organization_slug}/${project_slug}/people`
  };
}

moduleForAcceptance('Acceptance | Project People');

test('Requires authentication to visit.', function(assert) {
  assert.expect(1);

  let project = server.create('project');

  let urlParts = buildURLParts(project.organization.slug, project.slug);

  page.visit(urlParts.args);

  andThen(function() {
    assert.equal(currentRouteName(), 'login');
  });
});

test('Requires user to be project admin to visit.', function(assert) {
  assert.expect(1);

  let { project, user } = server.create('project-user', { role: 'contributor' });

  let urlParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(this.application, { user_id: user.id });

  page.visit(urlParts.args);

  andThen(function() {
    let projectUrl = `/${project.organization.slug}/${project.slug}`;
    assert.equal(currentURL(), projectUrl);
  });
});

test('Lists owner when owner is the only contributor.', function(assert) {
  assert.expect(9);

  let { project, user } = server.create('project-user', { role: 'owner' });

  let urlParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(this.application, { user_id: user.id });

  page.visit(urlParts.args);

  andThen(function() {
    assert.equal(currentURL(), urlParts.url);

    assert.ok(page.adminSection.isEmpty, 'Admins list is empty');
    assert.equal(page.adminSection.users.length, 0, 'Admins has no users listed');

    assert.ok(page.contributorSection.isEmpty, 'Others list is empty');
    assert.equal(page.contributorSection.users.length, 0, 'Others has no users listed');

    assert.notOk(page.ownerSection.isEmpty, 'Owners list is NOT empty');
    assert.equal(page.ownerSection.users.length, 1, 'Owners has 1 user listed');

    assert.ok(page.pendingSection.isEmpty, 'Pending contributors list is empty');
    assert.equal(page.pendingSection.users.length, 0, 'Pending contributors has no users listed');
  });
});

test('lists multiple contributors if they exist', function(assert) {
  assert.expect(18);

  let { project, user } = server.create('project-user', { role: 'owner' });

  server.create('project-user', { project, role: 'admin' });
  server.create('project-user', { project, role: 'contributor' });
  server.createList('project-user', 2, { project, role: 'pending' });

  let urlParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(this.application, { user_id: user.id });

  page.visit(urlParts.args);

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    return true;
  });

  andThen(function() {
    assert.equal(currentURL(), urlParts.url);

    assert.equal(page.projectMenu.peopleLink.infoText, '2 pending');

    assert.notOk(page.adminSection.isEmpty, 'Admins list is not empty');
    assert.equal(page.adminSection.users.length, 1, 'Admins has 1 user listed');

    assert.notOk(page.contributorSection.isEmpty, 'Others list is not empty');
    assert.equal(page.contributorSection.users.length, 1, 'Others has 1 user listed');

    assert.notOk(page.ownerSection.isEmpty, 'Owners list is not empty');
    assert.equal(page.ownerSection.users.length, 1, 'Owners has 1 user listed');

    assert.notOk(page.pendingSection.isEmpty, 'Pending contributors list is not empty');
    assert.equal(page.pendingSection.users.length, 2, 'Pending contributors has 2 users listed');
    page.pendingSection.users.objectAt(0).approveButton.click();
  });

  andThen(function() {
    assert.equal(page.projectMenu.peopleLink.infoText, '1 pending');
    assert.equal(page.pendingSection.users.length, 1, 'Pending contributors has 1 user listed');
    assert.equal(page.contributorSection.users.length, 2, 'Others has 2 users listed');

    page.pendingSection.users.objectAt(0).denyButton.click();
  });

  andThen(function() {
    assert.notOk(page.projectMenu.peopleLink.infoVisible);
    assert.equal(page.pendingSection.users.length, 0, 'Pending contributors has no users listed');
    assert.equal(page.contributorSection.users.length, 2, 'Others has 2 users listed');

    page.contributorSection.users.objectAt(0).projectUserRoleModal.openButton.click();
    page.contributorSection.users.objectAt(0).projectUserRoleModal.modal.radioGroupAdmin.radioButton.click();
    page.contributorSection.users.objectAt(0).projectUserRoleModal.modal.save();
  });

  andThen(function() {
    assert.equal(page.adminSection.users.length, 2, 'Admins has 2 users listed');
    assert.equal(page.contributorSection.users.length, 1, 'Others has 1 user listed');
    stub.restore();
  });
});

test('A project admin can message a member', function(assert) {
  assert.expect(3);

  let { project, user } = server.create('project-user', { role: 'admin' });

  server.create('project-user', { project, role: 'contributor' });

  let urlParts = buildURLParts(project.organization.slug, project.slug);

  authenticateSession(this.application, { user_id: user.id });

  page.visit(urlParts.args);

  andThen(() => {
    page.contributorSection.users.objectAt(0).newConversationModal.openButton.click();
  });

  andThen(() => {
    assert.ok(page.contributorSection.users.objectAt(0).newConversationModal.modal.isVisible, 'The modal is visible');
    page.contributorSection.users.objectAt(0).newConversationModal.modal.subject.fillIn('Test message');
    page.contributorSection.users.objectAt(0).newConversationModal.modal.body.fillIn('Lorem ipsum');
    page.contributorSection.users.objectAt(0).newConversationModal.modal.save();
  });

  andThen(() => {
    assert.notOk(page.contributorSection.users.objectAt(0).newConversationModal.modal.isVisible, 'The modal closed');
    let message = server.schema.messages.findBy({ authorId: user.id });
    assert.ok(message, 'Created the message');
  });
});
