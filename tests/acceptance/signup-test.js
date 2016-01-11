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

test("Signing up", (assert) => {
  assert.expect(3);

  visit('/signup');

  andThen(function() {
    fillIn('[name=username]', 'newUser');
    fillIn('[name=email]', 'newUser@example.com');
    fillIn('[name=password]', 'password');
    click('[name=signup]');
  });

  let done = assert.async();

  server.post('/users/', (db, request) => {
    let params = JSON.parse(request.requestBody).data.attributes;

    assert.equal(params.username, 'newUser');
    assert.equal(params.email, 'newUser@example.com');
    assert.equal(params.password, 'password');
    done();

    return {
      data: {
        id: 1,
        type: "users",
        attributes: params
      }
    };
  });
});
