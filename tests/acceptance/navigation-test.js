import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import indexPage from '../pages/index';
import signupPage from '../pages/signup';
import loginPage from '../pages/login';

moduleForAcceptance('Acceptance | Navigation');

test('Logged out, can sign up', function(assert) {
  assert.expect(2);
  indexPage.visit();
  andThen(function() {
    assert.ok(indexPage.navMenu.signUpLink.isVisible, 'Page contains sign up link.');
    indexPage.navMenu.signUpLink.click();
  });
  andThen(function() {
    assert.ok(signupPage.form.isVisible, 'Page contains sign up form');
  });
});

test('Logged out, can sign in', function(assert) {
  assert.expect(2);
  indexPage.visit();
  andThen(function() {
    assert.ok(indexPage.navMenu.signInLink.isVisible, 'Page contains sign in link.');
    indexPage.navMenu.signInLink.click();
  });
  andThen(function() {
    assert.ok(loginPage.form.isVisible, 'Page contains login form');
  });
});

test('Logged in, can visit conversations', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();

  andThen(function() {
    indexPage.navMenu.conversationsLink.click();
  });

  andThen(function() {
    assert.equal(currentURL(), '/conversations', 'Link went to conversations');
  });
});

test('Logged in, from user menu can visit profile', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();

  andThen(function() {
    indexPage.navMenu.userMenu.open();
  });
  andThen(function() {
    assert.equal(indexPage.navMenu.userMenu.profileLink.href, `/${user.username}`, 'Menu links to the account settings');
    indexPage.navMenu.userMenu.profileLink.click();
  });
  andThen(function() {
    assert.equal(currentURL(), `/${user.username}`, 'Link took us to user slugged route');
  });
});

test('Logged in, from user menu can visit profile settings', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();
  andThen(function() {
    indexPage.navMenu.userMenu.open();
  });
  andThen(function() {
    assert.equal(indexPage.navMenu.userMenu.settingsLink.href, '/settings/profile', 'Menu links to the profile settings');
    indexPage.navMenu.userMenu.settingsLink.click();
  });
  andThen(function() {
    assert.equal(currentURL(), '/settings/profile', 'Link took us to profile settings');
  });
});

test('Logged in, from user menu can log out', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();
  andThen(function() {
    indexPage.navMenu.userMenu.open();
  });
  andThen(function() {
    indexPage.navMenu.userMenu.logOut();
  });
  andThen(function() {
    assert.ok(indexPage.navMenu.signInLink.isVisible, 'Page contains sign in link.');
  });
});

test('Logged in, user with organizations can navigate to projects', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  let organization = server.create('organization', { owner: user });
  let project = server.create('project', { organization });
  server.create('project-user', { project, role: 'owner', user });
  authenticateSession(this.application, { user_id: user.id });

  indexPage.visit();
  andThen(function() {
    indexPage.navMenu.projectSwitcher.menuLink.click();
  });
  andThen(function() {
    indexPage.navMenu.projectSwitcher.projectSwitcherMenu.menu.projects.objectAt(0).icon.click();
  });
  andThen(function() {
    assert.equal(currentRouteName(), 'project.index');
  });
});
