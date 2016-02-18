import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Logout', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("Logging out", function(assert) {
  assert.expect(2);
  let user = server.create('user');
  authenticateSession(application, { user_id: user.id });
  visit('/');
  andThen(function() {
    assert.equal(find('a.logout').text(), "Log out", "Page contains logout link");
    click('a');
  });
  andThen(function() {
    assert.equal(find('a.login').text(), "Sign in", "Page contains login link");
  });
});
