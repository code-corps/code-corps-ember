import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

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
  visit('/');
  andThen(function() {
    assert.equal(find('.main.container').hasClass('light'), true);
  });
});
