import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import fillInFileInput from '../helpers/fill-in-file-input';
import removeDoubleQuotes from '../helpers/remove-double-quotes';
import organizationPage from '../pages/organization';

moduleForAcceptance('Acceptance | Organization Settings – Profile');

test('it requires authentication', function(assert) {
  assert.expect(1);

  let organization = server.create('organization');

  organizationPage.visitSettingsProfile({ organization: organization.slug });
  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('it requires user to be owner of organization', function(assert) {
  assert.expect(1);

  let organization = server.create('organization');
  let user = server.create('user');

  authenticateSession(this.application, { user_id: user.id });

  organizationPage.visitSettingsProfile({ organization: organization.slug });
  andThen(() => {
    assert.equal(currentRouteName(), 'projects-list', 'User was redirected due to not having ownership.');
  });
});

test('it allows editing of organization profile', function(assert) {
  assert.expect(4);

  let organization = server.create('organization');
  let user = organization.createOwner();

  authenticateSession(this.application, { user_id: user.id });

  organizationPage.visitSettingsProfile({ organization: organization.slug });
  andThen(() => {
    organizationPage.name('Test User').description('Lorem edit').clickSave();
  });

  let done = assert.async();

  server.patch('/organizations/1', function(schema, request) {
    let attrs = this.normalizedRequestAttrs();

    assert.equal(attrs.name, 'Test User');
    assert.equal(attrs.description, 'Lorem edit');
    done();

    return this._getJsonApiDocForRequest(request, 'organization');

  });

  andThen(() => {
    assert.equal(organizationPage.successAlerts.length, 1);
    assert.ok(organizationPage.successAlerts.objectAt(0).contains('Organization updated successfully'));
  });
});

test("it allows editing of organization's image", function(assert) {
  assert.expect(3);
  let done = assert.async();

  let fileName = 'file.png';
  let droppedImageString = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  let organization = server.create('organization');
  let user = organization.createOwner();

  authenticateSession(this.application, { user_id: user.id });

  organizationPage.visitSettingsProfile({ organization: organization.slug });

  andThen(() => {
    fillInFileInput('.image-drop input[type=file]', { name: fileName, content: droppedImageString });
  });

  andThen(() => {
    assert.equal(organizationPage.successAlerts.length, 1);
    assert.ok(organizationPage.successAlerts.objectAt(0).contains('Organization icon uploaded successfully'));
    let expectedStyle = `url(${droppedImageString})`;
    assert.equal(removeDoubleQuotes(find('.image-drop').css('background-image')), expectedStyle);
    done();
  });
});
