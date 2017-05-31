import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import loginPage from '../pages/login';
import signupPage from '../pages/signup';

moduleForAcceptance('Acceptance | Login');

test('Logging in', function(assert) {
  assert.expect(2);

  let email = 'test@test.com';
  let password = 'password';

  server.create('user', { email, password, state: 'selected_skills' });

  loginPage.visit();

  andThen(() => {
    loginPage.form.loginSuccessfully(email, password);
  });

  andThen(() => {
    loginPage.navMenu.userMenu.toggle();
  });

  andThen(() => {
    assert.ok(loginPage.navMenu.userMenu.logoutLinkVisible, 'Page contains logout link');
    assert.equal(currentURL(), '/projects');
  });
});

test('Login failure', function(assert) {
  let ERROR_TEXT = "Your password doesn't match the email volunteers@codecorps.org.";

  assert.expect(2);

  loginPage.visit();

  andThen(() => {
    loginPage.form.loginUnsuccessfully('volunteers@codecorps.org', 'password');
  });

  andThen(() => {
    assert.equal(loginPage.form.errors().count, 1, 'One error is shown');
    assert.equal(loginPage.form.errors(0).text, ERROR_TEXT, 'Page contains login error');
  });
});

test('When authenticated, redirects from login', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  loginPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/projects');
  });
});

test('When authenticated, redirects from signup', function(assert) {
  assert.expect(1);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  signupPage.visit();

  andThen(() => {
    assert.equal(currentURL(), '/projects');
  });
});

test('Can get to forgot password route from login page', function(assert) {
  loginPage.visit();
  loginPage.clickForgotPassword();
  andThen(() => {
    assert.equal(currentURL(), '/password/forgot');
  });
});
