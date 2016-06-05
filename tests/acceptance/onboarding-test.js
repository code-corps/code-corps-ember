import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

let application;

module('Acceptance: Onboarding', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('A user can onboard as expected', (assert) => {
  let user = server.create('user', { username: 'test_user', state: 'signed_up' });
  server.create('category');

  authenticateSession(application, { user_id: user.id });

  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/start/interests');
    assert.equal(find('.start-actions button').is(':disabled'), true);
    click('.category-item button');
  });

  andThen(() => {
    assert.equal(find('.start-actions button').is(':disabled'), false);
    click('.category-item button');
  });

  andThen(() => {
    assert.equal(find('.start-actions button').is(':disabled'), true);
    click('.category-item button');
    click('.start-actions button');
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/expertise');
  });
});

test('A user cannot navigate away from the onboarding', (assert) => {
  let user = server.create('user', { username: 'test_user', state: 'signed_up' });

  authenticateSession(application, { user_id: user.id });

  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/start/interests');
    click('.site-logo a');
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/interests');
  });
});
