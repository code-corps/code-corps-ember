import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';
import sinon from 'sinon';
import page from 'code-corps-ember/tests/pages/admin/organization-invites/new';

moduleForAcceptance('Acceptance | Admin | Organization Invites | New');

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

test('An admin can create and send an organization invite', function(assert) {
  assert.expect(3);

  let user = server.create('user', { admin: true, id: 1 });
  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    assert.equal(currentRouteName(), 'admin.organization-invites.new', 'The current route is correct');

    page.inviteForm
      .inputEmail('josh@codecorps.org')
      .inputOrganizationName('Code Corps')
      .clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'admin.organization-invites.index', 'We get redirected to the index');
    assert.equal(page.flashMessages().count, 1, 'A flash was displayed');
  });
});

test('Sending an invite can fail with validation errors', function(assert) {
  assert.expect(1);

  let user = server.create('user', { admin: true, id: 1 });
  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    let saveDone = assert.async();
    server.post('/organization-invites', function() {
      saveDone();

      return new Mirage.Response(422, {}, {
        errors: [
          {
            source: { pointer: 'data/attributes/email' },
            detail: "can't be blank",
            status: 422
          },
          {
            source: { pointer: 'data/attributes/organization-name' },
            detail: "can't be blank",
            status: 422
          }
        ]
      });
    });
  });

  andThen(() => {
    page.inviteForm.clickSubmit();
  });

  andThen(() => assert.equal(page.inviteForm.errors().count, 2));
});

test('Sending an invite can fail with an unknown error', function(assert) {
  assert.expect(1);

  let user = server.create('user', { admin: true, id: 1 });
  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    let saveDone = assert.async();
    server.post('/organization-invites', function() {
      saveDone();

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
  });

  andThen(() => {
    page.inviteForm.clickSubmit();
  });

  andThen(() => assert.equal(page.flashMessages().count, 1, 'A flash was displayed'));
});

test('Navigation is successful if user answers positively to prompt', function(assert) {
  assert.expect(2);

  let user = server.create('user', { admin: true, id: 1 });
  authenticateSession(this.application, { user_id: user.id });
  page.visit();

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return true;
  });

  andThen(() => {
    page.pageMenu.indexLink.click();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'admin.organization-invites.index');
    stub.restore();
  });
});

test('Navigation is aborted if user answers negatively to prompt', function(assert) {
  assert.expect(2);

  let user = server.create('user', { admin: true, id: 1 });
  authenticateSession(this.application, { user_id: user.id });
  page.visit();

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return false;
  });

  andThen(() => {
    page.pageMenu.indexLink.click();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'admin.organization-invites.new');
    stub.restore();
  });
});
