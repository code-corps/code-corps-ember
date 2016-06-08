import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Login', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Logging in', function(assert) {
  assert.expect(2);

  server.create('user', { id: 1 });

  visit('/login');
  fillIn('#identification', 'josh@coderly.com');
  fillIn('#password', 'password');
  click('#login');

  andThen(function() {
    assert.equal(find('a.logout').text().trim(), 'Log out', 'Page contains logout link');
    assert.equal(currentURL(), '/projects');
  });
});

test('Login failure', function(assert) {
  assert.expect(2);
  visit('/login');

  andThen(() => {
    fillIn('#identification', 'josh@coderly.com');
    fillIn('#password', 'wrongpassword');
    click('#login');
  });

  andThen(function() {
    assert.equal(find('.error').length, 1);
    assert.equal(find('.error').text(), 'The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.', 'Page contains login error');
  });
});

test('When authenticated, redirects from login', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/projects');
  });
});

test('When authenticated, redirects from signup', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });
  visit('/signup');

  andThen(function() {
    assert.equal(currentURL(), '/projects');
  });
});
