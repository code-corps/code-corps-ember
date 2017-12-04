import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from 'code-corps-ember/tests/pages/admin/organization-invites/index';

moduleForAcceptance('Acceptance | Admin | Organization Invites | Index');

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
    assert.equal(page.flashErrors().count, 1, 'Flash error was rendered');
    assert.equal(currentRouteName(), 'projects-list', 'Got redirected');
  });
});

test('Displays all the invites', function(assert) {
  assert.expect(21);

  let user = server.create('user', { admin: true, id: 1 });
  let organization1 = server.create('organization', { approved: false });
  let invite1 = server.create('organization-invite', { email: 'test@test.com', organization: organization1 });
  let organization2 = server.create('organization', { approved: true });
  let invite2 = server.create('organization-invite', { email: 'test@test.com', organization: organization2 });
  let invite3 = server.create('organization-invite', { email: 'test@test.com', organizationName: 'Test' });
  let invites = [invite1, invite2, invite3];

  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    assert.equal(currentURL(), '/admin/organization-invites');
    assert.equal(currentRouteName(), 'admin.organization-invites.index');
    assert.equal(page.logItems().count, 3, 'There are 3 rows.');

    assert.ok(page.logItems(0).icon.isVisible);
    assert.equal(page.logItems(0).name.text, invites[0].organization.name);
    assert.equal(page.logItems(0).email.text, invites[0].email);
    assert.equal(page.logItems(0).approvalStatus.text, 'Pending approval');
    assert.ok(page.logItems(0).actions.button.isVisible, 'The approve button renders');

    assert.ok(page.logItems(1).icon.isVisible);
    assert.equal(page.logItems(1).name.text, invites[1].organization.name);
    assert.equal(page.logItems(1).email.text, invites[1].email);
    assert.equal(page.logItems(1).approvalStatus.text, 'Approved');
    assert.notOk(page.logItems(1).actions.button.isVisible, 'The approve button does not render');

    assert.ok(page.logItems(2).icon.isVisible);
    assert.equal(page.logItems(2).name.text, invites[2].organizationName);
    assert.equal(page.logItems(2).email.text, invites[2].email);
    assert.equal(page.logItems(2).approvalStatus.text, 'Invite sent');
    assert.notOk(page.logItems(2).actions.button.isVisible, 'The approve button does not render');

    page.logItems(0).actions.button.click();
  });

  andThen(() => {
    assert.equal(page.flashMessages().count, 1, 'A flash was displayed');
    assert.equal(page.logItems(0).approvalStatus.text, 'Approved');
    assert.notOk(page.logItems(0).actions.button.isVisible, 'The approve button does not render');
  });
});
