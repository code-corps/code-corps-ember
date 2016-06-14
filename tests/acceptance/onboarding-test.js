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
  server.create('role', {
    name: 'Backend Developer',
    ability: 'Backend Development',
    kind: 'technology'
  });
  server.create('role', {
    name: 'Marketer',
    ability: 'Marketing',
    kind: 'creative'
  });
  server.create('role', {
    name: 'Donor',
    ability: 'Donations',
    kind: 'support'
  });
  server.create('skill', {
    title: 'Ruby'
  });

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
  });

  andThen(() => {
    click('.start-actions button');
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/expertise');
    assert.equal(find('.roles-column:eq(0) h3').text().trim(), 'Technology');
    assert.equal(find('.roles-column:eq(0) .roles-column-header').hasClass('technology'), true);
    assert.equal(find('.roles-column:eq(0) button').text().trim(), 'Backend Development');
    assert.equal(find('.roles-column:eq(1) h3').text().trim(), 'Creative');
    assert.equal(find('.roles-column:eq(1) .roles-column-header').hasClass('creative'), true);
    assert.equal(find('.roles-column:eq(1) button').text().trim(), 'Marketing');
    assert.equal(find('.roles-column:eq(2) h3').text().trim(), 'Support');
    assert.equal(find('.roles-column:eq(2) .roles-column-header').hasClass('support'), true);
    assert.equal(find('.roles-column:eq(2) button').text().trim(), 'Donations');
    assert.equal(find('.start-actions button').is(':disabled'), true);

    click('.roles-column:eq(0) button');
  });

  andThen(() => {
    assert.equal(find('.start-actions button').is(':disabled'), false);
    click('.roles-column:eq(0) button');
  });

  andThen(() => {
    assert.equal(find('.start-actions button').is(':disabled'), true);
    click('.roles-column:eq(0) button');
  });

  andThen(() => {
    click('.start-actions button');
  });

  andThen(() => {
    assert.equal(currentURL(), '/start/skills');
    fillIn('input', 'ru');
  });

  andThen(() => {
    find('input').trigger('focus');
    assert.equal(find('.dropdown-menu li:eq(0)').text().trim(), 'Ruby');
    find('.dropdown-menu li:eq(0)').click();
  });

  andThen(() => {
    assert.equal(find('.user-skills-list button:eq(0)').text().trim(), 'Ruby');
    find('.user-skills-list button:eq(0)').click();
  });

  andThen(() => {
    assert.equal(find('.user-skills-list button').length, 0);
    fillIn('input', 'r');
  });

  andThen(() => {
    find('input').trigger('focus');
    assert.equal(find('.dropdown-menu li:eq(0)').text().trim(), 'Ruby');
    find('.dropdown-menu li:eq(0)').click();
  });

  andThen(() => {
    click('.start-actions button');
  });

  andThen(() => {
    assert.equal(currentURL(), '/projects');
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

test('A user cannot navigate to onboarding when signed out', (assert) => {
  assert.expect(4);

  // TODO: Make this work with currentURL(), doesn't work with it right now
  function validateLoginRoute() {
    assert.equal(currentPath(), 'login');
  }

  visit('/start').then(validateLoginRoute);
  visit('/start/interests').then(validateLoginRoute);
  visit('/start/skills').then(validateLoginRoute);
  visit('/start/expertise').then(validateLoginRoute);
});
