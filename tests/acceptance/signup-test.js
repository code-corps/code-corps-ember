import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import indexPage from '../pages/index';
import signupPage from '../pages/signup';

const { run } = Ember;

let application;

module('Acceptance: Signup', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('Signup form is accessible from the main site', (assert) => {
  assert.expect(2);

  indexPage.visit();

  andThen(() => {
    assert.ok(indexPage.navMenu.signUp.isVisible, 'Link to sign-up route is visible');
    indexPage.navMenu.signUp.click();
  });

  andThen(() => {
    assert.equal(currentPath(), 'signup');
  });
});

test('Successful signup', (assert) => {
  assert.expect(6);

  signupPage.visit();

  andThen(function() {
    signupPage.form.username('username').email('email@example.com').password('password').save();
  });

  let signUpDone = assert.async();

  server.post('/users/', (db, request) => {
    let params = JSON.parse(request.requestBody).data.attributes;
    params.state = 'signed_up';

    assert.equal(params.username, 'username');
    assert.equal(params.email, 'email@example.com');
    assert.equal(params.password, 'password');

    signUpDone();

    return db.create('user', params);
  });

  let signInDone = assert.async();

  server.post('/token', function(db, request) {
    let json = request.requestBody;

    assert.ok(json.indexOf('"username":"email@example.com"') > -1);
    assert.ok(json.indexOf('"password":"password"') > -1);

    signInDone();

    return {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InBhc3N3b3JkIiwidXNlcm5hbWUiOiJqb3NoQGNvZGVybHkuY29tIiwidXNlcl9pZCI6MSwiZXhwIjo3MjAwfQ.QVDyAznECIWL6DjDs9iPezvMmoPuzDqAl4bQ6CY-fCQ',
      user_id: 1
    };
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/hello');
  });
});

test('Failed signup due to invalid data stays on same page', (assert) => {
  assert.expect(1);

  signupPage.visit();

  andThen(() => signupPage.form.save());

  andThen(() => assert.equal(currentURL(), '/signup'));
});
