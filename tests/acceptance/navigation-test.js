import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Navigation', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("Logged out, can sign up", function(assert) {
  assert.expect(2);
  visit('/');
  andThen(function() {
    assert.equal(find('.auth-nav li:first').text().trim(), "Sign up", "Page contains sign up link");
    click('.auth-nav li:first a');
  });
  andThen(function() {
    assert.equal(find('.signup-form').length, 1, "Page contains sign up form");
  });
});

test("Logged out, can sign in", function(assert) {
  assert.expect(2);
  visit('/');
  andThen(function() {
    assert.equal(find('.auth-nav li:last').text().trim(), "Sign in", "Page contains sign in link");
    click('.auth-nav li:last a');
  });
  andThen(function() {
    assert.equal(find('.login-form').length, 1, "Page contains login form");
  });
});

test('Logged in, from user menu can visit profile', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  let sluggedRoute = server.schema.sluggedRoutes.create({ slug: user.username });
  sluggedRoute.createOwner({ username: user.username }, 'User');
  sluggedRoute.save();

  visit('/');

  andThen(function() {
    click('.user-menu-select');
  });
  andThen(function() {
    assert.equal(find('.user-menu.dropdown .slugged-route').attr('href'), `/${user.username}`, 'Menu links to the profile settings');
    click('.user-menu.dropdown .slugged-route');
  });
  andThen(function() {
    assert.equal(currentURL(), `/${user.username}`, 'Link took us to user slugged route');
  });
});

test('Logged in, from user menu can visit profile settings', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  visit('/');
  andThen(function() {
    click('.user-menu-select');
  });
  andThen(function() {
    assert.equal(find('.user-menu.dropdown .profile').attr('href'), "/settings/profile", "Menu links to the profile settings");
    click('.user-menu.dropdown .profile');
  });
  andThen(function() {
    assert.equal(currentURL(), '/settings/profile', 'Link took us to profile settings');
  });
});

test("Logged in, from user menu can log out", function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  visit('/');
  andThen(function() {
    click('.user-menu-select');
  });
  andThen(function() {
    click('.user-menu.dropdown .logout');
  });
  andThen(function() {
    assert.equal(find('.auth-nav li:last').text().trim(), "Sign in", "Page contains sign in link");
  });
});
