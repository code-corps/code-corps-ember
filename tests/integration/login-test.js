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

test("Page contents", function(assert) {
  assert.expect(3);
  visit('/login').then(function() {
    assert.equal(find('#identification').length, 1, "Page contains login field");
    assert.equal(find('#password').length, 1, "Page contains password field");
    assert.equal(find('button').length, 1, "Page contains login button");
  });
});
