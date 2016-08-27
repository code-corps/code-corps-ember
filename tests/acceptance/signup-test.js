import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import indexPage from '../pages/index';
import signupPage from '../pages/signup';

let application;

module('Acceptance: Signup', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
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
    params["state"] = "signed_up";

    assert.equal(params.username, 'username');
    assert.equal(params.email, 'email@example.com');
    assert.equal(params.password, 'password');

    signUpDone();

    return db.create('user', params);
  });

  let signInDone = assert.async();

  server.post('/oauth/token', function(db, request) {
    let queryString = request.requestBody;

    assert.ok(queryString.indexOf('username=email%40example.com') > -1);
    assert.ok(queryString.indexOf('password=password') > -1);

    signInDone();

    return {
      access_token: "d3e45a8a3bbfbb437219e132a8286e329268d57f2d9d8153fbdee9a88c2e96f7",
      user_id: 1,
      token_type: "bearer",
      expires_in: 7200
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
