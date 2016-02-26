import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Settings – Profile', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("it requires authentication", (assert) => {
  assert.expect(1);

  visit('settings/profile');
  andThen(() => {
    assert.equal(currentRouteName(), 'login');
  });
});

test("it displays the user-settings-form component", (assert) => {
  assert.expect(1);

  var user = server.create('user');

  authenticateSession(application, { user_id: user.id });
  visit('settings/profile');
  andThen(() => {
    assert.equal(find('.user-settings-form').length, 1);
  });
});

test("it allows editing of users profile", (assert) => {
  assert.expect(6);

  var user = server.create('user');
  authenticateSession(application, { user_id: user.id });

  visit('settings/profile');

  andThen(() => {
    fillIn('input[name=name]', 'Test User');
    fillIn('input[name=twitter]', '@edited');
    fillIn('input[name=website]', 'edit.com');
    fillIn('input[name=biography]', 'Lorem edit');
    click('.save');
  });

  let done = assert.async();

  server.patch('/users/me', (db, request) => {
    let params = JSON.parse(request.requestBody).data.attributes;

    assert.equal(params.name, 'Test User');
    assert.equal(params.twitter, '@edited');
    assert.equal(params.website, 'edit.com');
    assert.equal(params.biography, 'Lorem edit');
    done();

    return {
      data: {
        id: user.id,
        type: "users",
        attributes: params
      }
    };
  });

  andThen(() => {
    assert.equal(find('.alert-success').length, 1);
    assert.equal(find('.alert-success p').text(), "Profile updated successfully");
  });
});
