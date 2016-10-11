import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import createUserWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-user-with-slugged-route';
import indexPage from '../pages/index';
import signupPage from '../pages/signup';
import loginPage from '../pages/login';

const { run } = Ember;

let application;

module('Acceptance: Navigation', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('Logged out, can sign up', function(assert) {
  assert.expect(2);
  indexPage.visit();
  andThen(function() {
    assert.equal(indexPage.navMenu.signUp.text, 'Sign up', 'Page contains sign up link');
    indexPage.navMenu.signUp.click();
  });
  andThen(function() {
    assert.ok(signupPage.form.isVisible, 'Page contains sign up form');
  });
});

test('Logged out, can sign in', function(assert) {
  assert.expect(2);
  indexPage.visit();
  andThen(function() {
    assert.equal(indexPage.navMenu.logIn.text, 'Sign in', 'Page contains sign in link');
    indexPage.navMenu.logIn.click();
  });
  andThen(function() {
    assert.ok(loginPage.form.isVisible, 'Page contains login form');
  });
});

test('Logged in, from user menu can visit profile', function(assert) {
  assert.expect(2);

  let user = createUserWithSluggedRoute();
  authenticateSession(application, { user_id: user.id });

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
  authenticateSession(application, { user_id: user.id });

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
  authenticateSession(application, { user_id: user.id });

  indexPage.visit();
  andThen(function() {
    indexPage.navMenu.userMenu.open();
  });
  andThen(function() {
    indexPage.navMenu.userMenu.logOut.click();
  });
  andThen(function() {
    assert.equal(indexPage.navMenu.logIn.text, 'Sign in', 'Page contains sign in link');
  });
});
