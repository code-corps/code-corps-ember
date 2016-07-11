import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import loginPage from '../pages/login';
import signupPage from '../pages/signup';

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

  server.create('user', { id: 1, state: 'selected_skills' });

  loginPage
    .visit()
    .form
      .loginSuccessfully();

  andThen(function() {
    assert.equal(loginPage.logOut.text, 'Log out', 'Page contains logout link');
    assert.equal(currentURL(), '/projects');
  });
});

test('Login failure', function(assert) {
  const ERROR_TEXT = 'The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.';

  assert.expect(2);

  loginPage
    .visit();

  andThen(() => {
    loginPage.form.loginUnsuccessfully();
  });

  andThen(function() {
    assert.equal(loginPage.form.errors().count, 1, 'One error is shown');
    assert.equal(loginPage.form.errors(0).text, ERROR_TEXT, 'Page contains login error');
  });
});

test('When authenticated, redirects from login', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  loginPage.visit();

  andThen(function() {
    assert.equal(currentURL(), '/projects');
  });
});

test('When authenticated, redirects from signup', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  signupPage.visit();

  andThen(function() {
    assert.equal(currentURL(), '/projects');
  });
});
