import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import onboardingPage from 'code-corps-ember/tests/pages/onboarding';
import indexPage from 'code-corps-ember/tests/pages/index';

moduleForAcceptance('Acceptance | Onboarding');

test('A user can onboard as expected', function(assert) {
  let user = server.create('user', { username: 'test_user', state: 'signed_up' });
  server.create('category');
  server.create('role', {
    name: 'Backend Developer',
    ability: 'Backend Development',
    kind: 'technology'
  });
  server.create('role', {
    name: 'Marketer',
    ability: 'Marketing',
    kind: 'creative'
  });
  server.create('role', {
    name: 'Donor',
    ability: 'Donations',
    kind: 'support'
  });
  server.create('skill', {
    title: 'Ruby'
  });

  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
    assert.ok(onboardingPage.startButton.isDisabled, 'start button disabled by default');
    onboardingPage.firstName('Josh');
    onboardingPage.lastName('Smith');
  });

  andThen(() => {
    assert.notOk(onboardingPage.startButton.isDisabled, 'start button is enabled');
    onboardingPage.startButton.click();
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/interests');
    assert.ok(onboardingPage.startButton.isDisabled, 'start button is disabled');
    onboardingPage.clickCategoryItem();
  });

  andThen(() => {
    assert.notOk(onboardingPage.startButton.isDisabled, 'start button is enabled');
    onboardingPage.clickCategoryItem();
  });

  andThen(() => {
    assert.ok(onboardingPage.startButton.isDisabled, 'start button is disabled');
    onboardingPage.clickCategoryItem();
  });

  andThen(() => {
    onboardingPage.startButton.click();
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/expertise');

    assert.equal(onboardingPage.roleColumns(0).header.title, 'Technology');
    assert.ok(onboardingPage.roleColumns(0).hasClass('expertise__column--technology'));
    assert.equal(onboardingPage.roleColumns(0).roles(0).button.text, 'Backend Development');

    assert.equal(onboardingPage.roleColumns(1).header.title, 'Creative');
    assert.ok(onboardingPage.roleColumns(1).hasClass('expertise__column--creative'));
    assert.equal(onboardingPage.roleColumns(1).roles(0).button.text, 'Marketing');

    assert.equal(onboardingPage.roleColumns(2).header.title, 'Support');
    assert.ok(onboardingPage.roleColumns(2).hasClass('expertise__column--support'));
    assert.equal(onboardingPage.roleColumns(2).roles(0).button.text, 'Donations');

    assert.ok(onboardingPage.startButton.isDisabled, 'start button is disabled');
    onboardingPage.roleColumns(0).roles(0).button.click();
  });

  andThen(() => {
    assert.notOk(onboardingPage.startButton.isDisabled, 'start button is enabled');
    onboardingPage.roleColumns(0).roles(0).button.click();
  });

  andThen(() => {
    assert.ok(onboardingPage.startButton.isDisabled, 'start button is disabled');
    onboardingPage.roleColumns(0).roles(0).button.click();
  });

  andThen(() => {
    onboardingPage.startButton.click();
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/skills');
    onboardingPage.skillsTypeahead.fillIn('ru');
  });

  andThen(() => {
    onboardingPage.skillsTypeahead.focus();
    assert.equal(onboardingPage.skillsTypeahead.inputItems(0).text, 'Ruby');
    onboardingPage.skillsTypeahead.inputItems(0).click();
  });

  andThen(() => {
    assert.equal(onboardingPage.userSkillsList(0).text, 'Ruby');
    onboardingPage.userSkillsList(0).click();
  });

  andThen(() => {
    assert.equal(onboardingPage.userSkillsList().count, 0);
    onboardingPage.skillsTypeahead.fillIn('r');
  });

  andThen(() => {
    onboardingPage.skillsTypeahead.focus();
    assert.equal(onboardingPage.skillsTypeahead.inputItems(0).text, 'Ruby');
    onboardingPage.skillsTypeahead.inputItems(0).click();
  });

  andThen(() => {
    onboardingPage.startButton.click();
  });

  andThen(() => {
    assert.equal(currentURL(), '/projects');
  });
});

test('A user cannot navigate away from the onboarding', function(assert) {
  let user = server.create('user', { username: 'test_user', state: 'signed_up' });

  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
    onboardingPage.navMenu.logo.click();
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
  });
});

test('A user cannot navigate to onboarding when signed out', function(assert) {
  assert.expect(4);

  // TODO: Make this work with currentURL(), doesn't work with it right now
  function validateLoginRoute() {
    assert.equal(currentPath(), 'login');
  }

  let done = assert.async();
  onboardingPage.start().then(validateLoginRoute);
  onboardingPage.interests().then(validateLoginRoute);
  onboardingPage.skills().then(validateLoginRoute);
  onboardingPage.expertise().then(validateLoginRoute);

  andThen(() => {
    done();
  });
});

test('A user can submit name by hitting enter key on firstName input field', function(assert) {
  let user = server.create('user', { username: 'test_user', state: 'signed_up' });

  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
    onboardingPage.firstName('Josh');
    onboardingPage.lastName('Smith');
  });

  andThen(() => {
    assert.notOk(onboardingPage.startButton.isDisabled, 'start button is enabled');
    onboardingPage.firstNameEnter();
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/interests');
    assert.ok(onboardingPage.startButton.isDisabled, 'start button is disabled');
  });
});

test('A user can submit name by hitting enter key on lastName input field', function(assert) {
  let user = server.create('user', { username: 'test_user', state: 'signed_up' });

  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
    onboardingPage.firstName('Josh');
    onboardingPage.lastName('Smith');
  });

  andThen(() => {
    assert.notOk(onboardingPage.startButton.isDisabled, 'start button is enabled');
    onboardingPage.lastNameEnter();
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/interests');
    assert.ok(onboardingPage.startButton.isDisabled, 'start button is disabled');
  });
});

test('A user cannot submit name by hitting enter key if firstName input field is blank', function(assert) {
  let user = server.create('user', { username: 'test_user', state: 'signed_up' });

  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
    onboardingPage.lastName('Smith');
  });

  andThen(() => {
    assert.ok(onboardingPage.startButton.isDisabled, 'start button is disabled');
    onboardingPage.lastNameEnter();
    onboardingPage.firstNameEnter();
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
  });
});

test('A user cannot submit name by hitting enter key if lastName input field is blank', function(assert) {
  let user = server.create('user', { username: 'test_user', state: 'signed_up' });

  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
    onboardingPage.firstName('Josh');
  });

  andThen(() => {
    assert.ok(onboardingPage.startButton.isDisabled, 'start button is disabled');
    onboardingPage.lastNameEnter();
    onboardingPage.firstNameEnter();
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
  });
});

test('The footer is hidden when onboarding', function(assert) {
  let user = server.create('user', { username: 'test_user', state: 'signed_up' });

  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
    onboardingPage.navMenu.logo.click();
    assert.ok(onboardingPage.footer.isHidden, 'no footer visible');
  });
});

test('it allows editing of users image and disabled btn while uploading', function(assert) {
  assert.expect(5);
  let done = assert.async();

  let user = server.create('user', { username: 'test_user', state: 'signed_up' });

  authenticateSession(this.application, { user_id: user.id });

  let droppedImageString = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  indexPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
    onboardingPage.firstName('Josh');
    onboardingPage.lastName('Smith');
  });

  andThen(() => {
    assert.equal(onboardingPage.startButton.isDisabled, undefined, 'start button is not disabled after filling in user names');
    onboardingPage.imageDrop.dropFile(droppedImageString);
    assert.equal(onboardingPage.startButton.isDisabled, 'disabled', 'start button is disabled while uploading image');
  });

  andThen(() => {
    assert.equal(onboardingPage.imageDrop.backgroundImageData(), `url(${droppedImageString})`);
    assert.equal(onboardingPage.startButton.isDisabled, undefined, 'start button is not disabled after filling in user names and uploading of image is done');
    done();
  });
});
