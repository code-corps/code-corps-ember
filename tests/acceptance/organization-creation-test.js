import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';
import sinon from 'sinon';
import loginPage from 'code-corps-ember/tests/pages/login';
import page from 'code-corps-ember/tests/pages/organizations/new';

moduleForAcceptance('Acceptance | Organization Creation');

test('Creating an organization requires logging in', function(assert) {
  assert.expect(2);

  let { code } = server.create('organization-invite', { code: 'valid' });

  page.visit({ code });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'Got redirected to login');

    let email = 'test@test.com';
    let password = 'password';
    server.create('user', { email, password });

    loginPage.form.loginSuccessfully(email, password);
  });

  andThen(() => {
    assert.equal(currentURL(), `/organizations/new?code=${code}`);
  });
});

test('If the code is not provided, the user is allowed to type it in', function(assert) {
  assert.expect(5);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let code = 'valid';
  server.create('organization-invite', { code });

  page.visit();

  andThen(() => {
    assert.ok(page.inviteCodeForm.isVisible, 'Invite code form ui is rendered');
    assert.notOk(page.organizationForm.isVisible, 'Organization form is not rendered');
    page.inviteCodeForm.inputCode('valid').clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'organizations.new', 'User is back on the same page');
    assert.notOk(page.inviteCodeForm.isVisible, 'Invite form is no longer rendered');
    assert.ok(page.organizationForm.isVisible, 'Organization form is rendered');
  });
});

test('If the code has already been used, the user is allowed to type in another one', function(assert) {
  assert.expect(5);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let organization = server.create('organization');
  server.create('organization-invite', { code: 'used', organization });
  server.create('organization-invite', { code: 'valid' });

  page.visit({ code: 'used' });

  andThen(() => {
    assert.ok(page.inviteCodeForm.isVisible, 'Invite code form ui is rendered');
    assert.notOk(page.organizationForm.isVisible, 'Organization form is not rendered');
    page.inviteCodeForm.inputCode('valid').clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'organizations.new', 'User is back on the same page');
    assert.notOk(page.inviteCodeForm.isVisible, 'Invite form is no longer rendered');
    assert.ok(page.organizationForm.isVisible, 'Organization form is rendered');
  });
});

test('If the code is invalid, the user is allowed to type in another one', function(assert) {
  assert.expect(5);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let code = 'valid';
  server.create('organization-invite', { code });

  page.visit({ code: 'invalid' });

  andThen(() => {
    assert.ok(page.inviteCodeForm.isVisible, 'Invite code form ui is rendered');
    assert.notOk(page.organizationForm.isVisible, 'Organization form is not rendered');
    page.inviteCodeForm.inputCode('valid').clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'organizations.new', 'User is back on the same page');
    assert.notOk(page.inviteCodeForm.isVisible, 'Invite form is no longer rendered');
    assert.ok(page.organizationForm.isVisible, 'Organization form is rendered');
  });
});

test('Creating an organization can fail with validation errors', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let code = 'valid';
  server.create('organization-invite', { code });
  page.visit({ code });

  andThen(() => {
    let saveDone = assert.async();
    server.post('/organizations', function() {
      saveDone();

      return new Mirage.Response(422, {}, {
        errors: [
          {
            source: { pointer: 'data/attributes/cloudinary-public-id' },
            detail: "can't be blank",
            status: 422
          },
          {
            source: { pointer: 'data/attributes/description' },
            detail: "can't be blank",
            status: 422
          },
          {
            source: { pointer: 'data/attributes/name' },
            detail: "can't be blank",
            status: 422
          },
          {
            source: { pointer: 'data/attributes/slug' },
            detail: "can't be blank",
            status: 422
          }
        ]
      });
    });
  });

  andThen(() => {
    page.organizationForm.clickSubmit();
  });

  andThen(() => assert.equal(page.organizationForm.errors.length, 4));
});

test('Creating an organization can fail with an unknown error', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let code = 'valid';
  server.create('organization-invite', { code });
  page.visit({ code });

  andThen(() => {
    let saveDone = assert.async();
    server.post('/organizations', function() {
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
    page.organizationForm.clickSubmit();
  });

  andThen(() => assert.equal(page.flashMessages.length, 1, 'A flash was displayed'));
});

test('A user with a valid invite can create an organization', function(assert) {
  assert.expect(5);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let droppedImageString = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  let code = 'valid';
  let organizationName = 'Foo';
  server.create('organization-invite', { code, organizationName });
  page.visit({ code });

  andThen(() => {
    assert.equal(page.organizationForm.name, organizationName, 'Organization name was prefiled');
    page.organizationForm.imageDrop.dropZone.dropFile(droppedImageString);
    assert.equal(page.organizationForm.imageDrop.dropZone.backgroundImageUrl(), droppedImageString, 'Image dropped successfully');
    page.organizationForm
      .inputName('Bar')
      .inputDescription('Baz')
      .clickSubmit();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'projects.new', 'User was redirected correctly');
    let organization = server.schema.organizations.findBy({ name: 'Bar', description: 'Baz' });
    assert.ok(organization, 'Organization was created.');
    assert.ok(organization.cloudinaryPublicId, 'Organization has image.');
  });
});

test('Navigation is successful if user answers positively to prompt', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let code = 'valid';
  server.create('organization-invite', { code });
  page.visit({ code });

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return true;
  });

  andThen(() => {
    page.navigationMenu.projectsLink.click();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'projects-list', 'Navigation was successful.');
    stub.restore();
  });
});

test('Navigation is aborted if user answers negatively to prompt', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let code = 'valid';
  server.create('organization-invite', { code });
  page.visit({ code });

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return false;
  });

  andThen(() => {
    page.navigationMenu.projectsLink.click();
  });

  andThen(() => {
    assert.equal(currentURL(), `organizations/new?code=${code}`);
    stub.restore();
  });
});
