import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

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

  visit('/');

  andThen(() => {
    assert.equal(find('a.signup').length, 1, 'Link to sign-up route is visible');
    click('a.signup');
  });

  andThen(() => {
    assert.equal(currentPath(), 'signup');
  });
});

test('Successful signup', (assert) => {
  assert.expect(6);

  visit('/signup');

  andThen(function() {
    fillIn('[name=username]', 'username');
    fillIn('[name=email]', 'email@example.com');
    fillIn('[name=password]', 'password');
    click('[name=signup]');
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
    assert.equal(currentURL(), '/start/interests');
  });
});

test('Failed signup due to invalid data stays on same page', (assert) => {
  assert.expect(1);

  visit('/signup');

  andThen(() => {
    click('[name=signup]');
  });

  andThen(() => {
    assert.equal(currentURL(), '/signup');
  });
});
