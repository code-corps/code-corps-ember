import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from 'code-corps-ember/tests/pages/admin/projects/index';
import Mirage from 'ember-cli-mirage';

moduleForAcceptance('Acceptance | Admin | Projects');

test('The page requires logging in', function(assert) {
  assert.expect(1);

  page.visit();

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'Got redirected to login');
  });
});

test('The page requires user to be admin', function(assert) {
  assert.expect(2);

  let user = server.create('user', { admin: false, id: 1 });
  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    assert.equal(page.flashErrors.length, 1, 'Flash error was rendered');
    assert.equal(currentRouteName(), 'projects-list', 'Got redirected');
  });
});

test('An admin can view a list of projects', function(assert) {
  assert.expect(15);

  let user = server.create('user', { admin: true, id: 1 });

  let unapprovedProject = server.create('project', { approvalRequested: false, approved: false });
  let projectPendingApproval = server.create('project', { approvalRequested: true, approved: false });
  let approvedProject = server.create('project', { approvalRequested: true, approved: true });

  [unapprovedProject, projectPendingApproval, approvedProject]
    .map(({ organization }) => organization)
    .forEach((organization) => server.create('slugged-route', { organization }));

  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    assert.equal(currentURL(), '/admin/projects');
    assert.equal(currentRouteName(), 'admin.projects.index');

    assert.equal(page.items.length, 3, 'There are 3 rows.');

    [unapprovedProject, projectPendingApproval, approvedProject].forEach((project, index) => {
      assert.equal(page.items.objectAt(index).title.text, project.title, 'Project title is rendered.');
      assert.equal(page.items.objectAt(index).icon.src, project.iconThumbUrl, 'Project icon is rendered.');
    });

    assert.equal(page.items.objectAt(0).approvalStatus.text, 'Created', 'Correct status is rendered for newly created project.');
    assert.notOk(page.items.objectAt(0).actions.approve.isVisible, 'Approve button is not rendered for newly created project.');

    assert.equal(page.items.objectAt(1).approvalStatus.text, 'Pending approval', 'Correct status is rendered for project pending approval.');
    assert.ok(page.items.objectAt(1).actions.approve.isVisible, 'Approve button is rendered for project pending approval.');

    assert.equal(page.items.objectAt(2).approvalStatus.text, 'Approved', 'Correct status is rendered for approved project.');
    assert.notOk(page.items.objectAt(2).actions.approve.isVisible, 'Approve button is not rendered for approved project');
  });
});

test('An admin can approve a project', function(assert) {
  assert.expect(2);

  let user = server.create('user', { admin: true, id: 1 });
  let unapprovedProject = server.create('project', { approved: false, approvalRequested: true });

  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    page.items.objectAt(0).actions.approve.click();
  });

  andThen(() => {
    assert.ok(unapprovedProject.approved, 'Project is approved.');
    assert.equal(page.items.objectAt(0).approvalStatus.text, 'Approved', 'Project status is rendered correctly.');
  });
});

test('A flash error renders when project approval fails', function(assert) {
  assert.expect(1);

  let user = server.create('user', { admin: true, id: 1 });
  let project = server.create('project', { approved: false, approvalRequested: true });

  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  let done = assert.async();

  server.patch(`/projects/${project.id}`, function() {
    done();
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

  andThen(() => {
    page.items.objectAt(0).actions.approve.click();
  });

  andThen(() => {
    assert.equal(page.flashErrors.length, 1, 'Flash error is rendered.');
  });
});
