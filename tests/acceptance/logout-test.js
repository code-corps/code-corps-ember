import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Login', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test("Logging out", function(assert) {
  assert.expect(2);
  authenticateSession(application);
  visit('/');
  andThen(function() {
    assert.equal(find('a.logout').text(), "Logout", "Page contains logout link");
    click('a');
  });
  andThen(function() {
    assert.equal(find('a.login').text(), "Login", "Page contains login link");
  });
});
