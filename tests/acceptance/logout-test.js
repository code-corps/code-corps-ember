import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import indexPage from '../pages/index';

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
  indexPage.visit();
  andThen(function() {
    assert.equal(indexPage.navMenu.userMenu.logOut.text, "Log out", "Page contains logout link");
    indexPage.navMenu.userMenu.logOut.click();
  });
  andThen(function() {
    assert.equal(indexPage.navMenu.logIn.text, "Sign in", "Page contains login link");
  });
});
