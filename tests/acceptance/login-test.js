import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import loginPage from '../pages/login';
import signupPage from '../pages/signup';

const { run } = Ember;

let application;

module('Acceptance: Login', {
  beforeEach: () => {
    application = startApp();
  },
  afterEach: () => {
    run(application, 'destroy');
  }
});

test('Logging in', function(assert) {
  assert.expect(2);

  server.create('user', { id: 1, state: 'selected_skills' });

  loginPage.visit();

  andThen(() => {
    loginPage.form.loginSuccessfully();
  });

  andThen(() => {
    assert.equal(loginPage.navMenu.userMenu.logOut.text, 'Log out', 'Page contains logout link');
    assert.equal(currentURL(), '/projects');
  });
});

test('Login failure', function(assert) {
  // Mirage expects volunteers@codecorps.org as default email
  let ERROR_TEXT = "Your password doesn't match the email volunteers@codecorps.org.";

  assert.expect(2);

  loginPage.visit();

  andThen(() => {
    loginPage.form.loginUnsuccessfully();
  });

  andThen(() => {
    assert.equal(loginPage.form.errors().count, 1, 'One error is shown');
    assert.equal(loginPage.form.errors(0).text, ERROR_TEXT, 'Page contains login error');
  });
});

test('When authenticated, redirects from login', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  loginPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/projects');
  });
});

test('When authenticated, redirects from signup', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  signupPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/projects');
  });
});
