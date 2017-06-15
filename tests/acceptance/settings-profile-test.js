import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import settingsProfilePage from '../pages/settings/profile';

moduleForAcceptance('Acceptance | Settings – Profile');

test('it requires authentication', function(assert) {
  assert.expect(1);

  settingsProfilePage.visit();
  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test('it displays the user-settings-form component', function(assert) {
  assert.expect(1);

  let user = server.create('user');

  authenticateSession(this.application, { user_id: user.id });
  settingsProfilePage.visit();
  andThen(() => {
    assert.ok(settingsProfilePage.userSettingsForm.isVisible);
  });
});

test('it allows editing of users profile', function(assert) {
  assert.expect(7);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  settingsProfilePage.visit();

  andThen(() => {
    settingsProfilePage.userSettingsForm.firstName('Test');
    settingsProfilePage.userSettingsForm.lastName('User');
    settingsProfilePage.userSettingsForm.twitter('@edited');
    settingsProfilePage.userSettingsForm.website('edit.com');
    settingsProfilePage.userSettingsForm.biography('Lorem edit');
    settingsProfilePage.userSettingsForm.clickSave();
  });

  let done = assert.async();

  server.patch('/users/:id', function(schema, request) {
    let attrs = this.normalizedRequestAttrs();

    assert.equal(attrs.firstName, 'Test');
    assert.equal(attrs.lastName, 'User');
    assert.equal(attrs.twitter, '@edited');
    assert.equal(attrs.website, 'edit.com');
    assert.equal(attrs.biography, 'Lorem edit');
    done();

    return this._getJsonApiDocForRequest(request, 'user');
  });

  andThen(() => {
    assert.ok(settingsProfilePage.successAlert.isVisible);
    assert.equal(settingsProfilePage.successAlert.message, 'Profile updated successfully');
  });
});

test('it allows editing of users image', function(assert) {
  assert.expect(3);
  let done = assert.async();

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let droppedImageString = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  settingsProfilePage.visit();

  andThen(() => {
    settingsProfilePage.userSettingsForm.imageDrop.dropFile(droppedImageString);
  });

  andThen(() => {
    assert.ok(settingsProfilePage.successAlert.isVisible);
    assert.equal(settingsProfilePage.successAlert.message, 'Photo uploaded successfully');
    assert.equal(settingsProfilePage.userSettingsForm.imageDrop.backgroundImageData(), `url(${droppedImageString})`);
    done();
  });
});
