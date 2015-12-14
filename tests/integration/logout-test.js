import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
var App;

module('Integration: Login', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, App.destroy);
  }
});

test("Logging out", function(assert) {
  assert.expect(1);
  visit('/login');
  fillIn("#identification", "josh@coderly.com");
  fillIn("#password", "password");
  click('button');
  andThen(function() {
    assert.equal(find('a').text(), "Logout", "Page contains logout link");
  });
});
