import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Integration: Signup', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("Succesful signup is possible", (assert) => {
  assert.expect(3);

  visit('/signup');

  andThen(function() {
    fillIn('[name=username]', 'newUser');
    fillIn('[name=email]', 'newUser@example.com');
    fillIn('[name=password]', 'password');
    click('[name=signup]');
  });

  let signUpDone = assert.async();

  server.post('/users/', (db, request) => {
    let params = JSON.parse(request.requestBody).data.attributes;

    assert.equal(params.username, 'newUser');
    assert.equal(params.email, 'newUser@example.com');
    assert.equal(params.password, 'password');

    signUpDone();

    return {
      data: {
        id: 1,
        type: "users",
        attributes: params
      }
    };
  });

  let signInDone = assert.async();

  server.post('/oauth/token', function() {
    signInDone();

    return {
      access_token: "d3e45a8a3bbfbb437219e132a8286e329268d57f2d9d8153fbdee9a88c2e96f7",
      user_id: 1,
      token_type: "bearer",
      expires_in: 7200
    };
  });
});

test('Succesful signup also logs user in', (assert) => {
  assert.expect(2);

  visit('/signup');

  andThen(function() {
    fillIn('[name=username]', 'newUser');
    fillIn('[name=email]', 'newUser@example.com');
    fillIn('[name=password]', 'password');
    click('[name=signup]');
  });

  let signUpDone = assert.async();

  server.post('/users/', (db, request) => {
    let params = JSON.parse(request.requestBody).data.attributes;

    signUpDone();

    return {
      data: {
        id: 1,
        type: "users",
        attributes: params
      }
    };
  });

  let signInDone = assert.async();

  server.post('/oauth/token', function(db, request) {
    let queryString = request.requestBody;

    assert.ok(queryString.indexOf('username=newUser') > -1);
    assert.ok(queryString.indexOf('password=password') > -1);

    signInDone();

    return {
      access_token: "d3e45a8a3bbfbb437219e132a8286e329268d57f2d9d8153fbdee9a88c2e96f7",
      user_id: 1,
      token_type: "bearer",
      expires_in: 7200
    };
  });
});
