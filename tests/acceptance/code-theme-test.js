import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import indexPage from '../pages/index';

let application;

module('Acceptance: Code Theme', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Code theme class exists on the main container', function(assert) {
  assert.expect(1);

  indexPage.visit();

  andThen(function() {
    assert.ok(indexPage.isLightTheme, 'light class added to .main.container');
  });
});
