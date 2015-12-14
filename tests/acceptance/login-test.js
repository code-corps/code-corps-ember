import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Integration: Login', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, application.destroy);
  }
});

test("Page contents", function(assert) {
  assert.expect(3);
  visit('/login');
  andThen(function() {
    assert.equal(find('#identification').length, 1, "Page contains login field");
    assert.equal(find('#password').length, 1, "Page contains password field");
    assert.equal(find('button').length, 1, "Page contains login button");
  });
});

test("Logging in", function(assert) {
  assert.expect(1);
  visit('/login');
  fillIn("#identification", "josh@coderly.com");
  fillIn("#password", "password");
  click('button');
  andThen(function() {
    assert.equal(find('a').text(), "Logout", "Page contains logout link");
  });
});

test("Login failure", function(assert) {
  assert.expect(1);
  visit('/login');
  fillIn("#identification", "josh@coderly.com");
  fillIn("#password", "wrongpassword");
  click('button');
  andThen(function() {
    assert.equal(find('p').text(), "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.", "Page contains login error");
  });
});
