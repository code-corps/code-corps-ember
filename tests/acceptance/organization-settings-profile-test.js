import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createOrganizationWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-organization-with-slugged-route';
import fillInFileInput from '../helpers/fill-in-file-input';
import removeDoubleQuotes from '../helpers/remove-double-quotes';
import organizationPage from '../pages/organization';

moduleForAcceptance('Acceptance | Organization Settings – Profile');

test('it requires authentication', function(assert) {
  assert.expect(1);

  let organization = createOrganizationWithSluggedRoute();

  organizationPage.visitSettingsProfile({ organization: organization.slug });
  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('it allows editing of organization profile', function(assert) {
  assert.expect(4);

  let user = server.create('user');

  let organization = createOrganizationWithSluggedRoute();

  server.create('organizationMembership', {
    member: user,
    organization,
    role: 'admin'
  });

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
    assert.equal(organizationPage.successAlerts().count, 1);
    assert.equal(organizationPage.successAlerts(0).contains('Organization updated successfully'), true);
  });
});

test("it allows editing of organization's image", function(assert) {
  assert.expect(3);
  let done = assert.async();

  let fileName = 'file.png';
  let droppedImageString = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  let user = server.create('user');

  let organization = createOrganizationWithSluggedRoute();

  server.create('organizationMembership', {
    member: user,
    organization,
    role: 'admin'
  });

  authenticateSession(this.application, { user_id: user.id });

  organizationPage.visitSettingsProfile({ organization: organization.slug });

  andThen(() => {
    fillInFileInput('.image-drop input[type=file]', { name: fileName, content: droppedImageString });
  });

  andThen(() => {
    assert.equal(organizationPage.successAlerts().count, 1);
    assert.equal(organizationPage.successAlerts(0).contains('Organization icon uploaded successfully'), true);
    let expectedStyle = `url(${droppedImageString})`;
    assert.equal(removeDoubleQuotes(find('.image-drop').css('background-image')), expectedStyle);
    done();
  });
});
