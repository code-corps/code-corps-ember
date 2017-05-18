import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';
import page from '../pages/github';
import Ember from 'ember';

const { set } = Ember;

const code = 'test_code';
const state = 'test_state';

moduleForAcceptance('Acceptance: Github');

test('it requires authentication', function(assert) {
  assert.expect(1);

  page.visit({ code });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'User was redirected to login.');
  });
});

test('if state is invalid, redirects to projects-list with flash error', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  page.visit({ code, state });

  andThen(() => {
    assert.equal(
      currentRouteName(),
      'settings.profile',
      'User was redirected to their profile.'
    );

    assert.equal(page.flashMessages().count, 1, 'A flash was displayed');
  });
});

test('it posts code to API, redirects to profile on success', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });
  let session = this.application.__container__.lookup('service:session');
  set(session, 'data.githubState', state);

  server.post('/github-connect', function() {
    assert.deepEqual(
      this.normalizedRequestAttrs(),
      { code },
      'Correct data was sent in request.'
    );

    return user.update('githubAuthToken', 'test_token');
  });

  page.visit({ code, state });

  andThen(() => {
    assert.equal(currentRouteName(), 'settings.profile', 'User was redirected to their profile.');
  });
});

test('if connect request fails, redirects to project list with flash error', function(assert) {
  assert.expect(2);

  let user = server.create('user');
  authenticateSession(this.application, { user_id: user.id });

  let session = this.application.__container__.lookup('service:session');
  set(session, 'data.githubState', state);

  server.post('/github-connect', function() {
    return new Mirage.Response(422, {}, {
      errors: [{
        id: 'VALIDATION_ERROR',
        source: { pointer: 'data/attributes/code' },
        detail: 'is invalid',
        status: 422
      }]
    });
  });

  page.visit({ code, state });

  andThen(() => {
    assert.equal(
      currentRouteName(),
      'settings.profile',
      'User was redirected to their profile.'
    );

    assert.equal(page.flashMessages().count, 1, 'A flash was displayed');
  });
});
