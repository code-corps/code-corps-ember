import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

/*globals server*/

let application;

module('Integration: Profile', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("it requires authentication", (assert) => {
  assert.expect(1);

  visit('profile');
  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test("it displays the profile-details component", (assert) => {
  assert.expect(1);

  var user = server.create('user');

  authenticateSession(application, { user_id: user.id });
  visit('profile');
  andThen(() => {
    assert.equal(find('.profile-details').length, 1);
  });
});

test("it allows editing of users profile", (assert) => {
  assert.expect(1);

  var user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  visit('profile');

  andThen(() => {
    click('.start-edit');
    fillIn('input[name=username]', 'edited');
    fillIn('input[name=twitter]', '@edited');
    fillIn('input[name=website]', 'edit.com');
    fillIn('input[name=biography]', 'Lorem edit');
    click('.save');
  });

  let done = assert.async();

  server.patch('/users/' + user.id, (db, request) => {
    let params = JSON.parse(request.requestBody).data.attributes;
    let expectedParams = {
      username: 'edited',
      twitter: '@edited',
      website: 'edit.com',
      biography: 'Lorem edit'
    };

    assert.deepEqual(params, expectedParams);
    done();

    return {
      data: {
        id: user.id,
        type: "users",
        attributes: params
      }
    };
  });
});

