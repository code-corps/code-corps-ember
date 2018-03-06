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
    settingsProfilePage.userSettingsForm.imageDrop.dropZone.dropFile(droppedImageString);
  });

  andThen(() => {
    assert.ok(settingsProfilePage.successAlert.isVisible);
    assert.equal(settingsProfilePage.successAlert.message, 'Photo uploaded successfully');
    assert.equal(settingsProfilePage.userSettingsForm.imageDrop.dropZone.backgroundImageUrl(), droppedImageString);
    done();
  });
});

test("it allows editing of project's categories for owners", function(assert) {
  assert.expect(5);

  let user = server.create('user');
  let category = server.create('category', { name: 'Technology' });
  let params = { userId: user.id, categoryId: category.id };

  authenticateSession(this.application, { user_id: user.id });

  settingsProfilePage.visit();

  andThen(() => {
    assert.equal(settingsProfilePage.categoryCheckboxes.checkboxes.objectAt(0).label.name, 'Technology', 'The checkbox renders');
    settingsProfilePage.categoryCheckboxes.checkboxes.objectAt(0).label.click();
  });

  andThen(() => {
    assert.ok(settingsProfilePage.categoryCheckboxes.checkboxes.objectAt(0).isChecked, 'The category was added.');
    assert.ok(server.schema.userCategories.findBy(params), 'User category was created.');
    settingsProfilePage.categoryCheckboxes.checkboxes.objectAt(0).label.click();
  });

  andThen(() => {
    assert.notOk(settingsProfilePage.categoryCheckboxes.checkboxes.objectAt(0).isChecked, 'The category was removed.');
    assert.notOk(server.schema.userCategories.findBy(params), 'User category was deleted.');
  });
});

test("it allows editing of user's skills", function(assert) {
  assert.expect(3);

  let user = server.create('user');
  server.create('skill', { title: 'Ruby' });

  authenticateSession(this.application, { user_id: user.id });

  settingsProfilePage.visit();

  andThen(() => {
    settingsProfilePage.skillsTypeahead.searchFor('ru');
  });

  andThen(() => {
    assert.equal(settingsProfilePage.skillsTypeahead.dropdown.inputItems.objectAt(0).text, 'Ruby', 'The text in the typeahead matches the searched text');
    settingsProfilePage.skillsTypeahead.dropdown.inputItems.objectAt(0).click();
  });

  andThen(() => {
    assert.equal(settingsProfilePage.userSkillsList.objectAt(0).text, 'Ruby', 'The skill was added to the list');
    settingsProfilePage.userSkillsList.objectAt(0).click();
  });

  andThen(() => {
    assert.equal(settingsProfilePage.userSkillsList.length, 0, 'The skill was removed from the list');
  });
});
