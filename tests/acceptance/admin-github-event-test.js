import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from '../pages/admin/github-events/show';
import moment from 'moment';

moduleForAcceptance('Acceptance | Admin | GitHub Event | Show');

test('The page requires logging in', function(assert) {
  assert.expect(1);

  let event = server.create('github-event');
  page.visit({ id: event.id });

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'Got redirected to login');
  });
});

test('The page requires user to be admin', function(assert) {
  assert.expect(2);

  let user = server.create('user', { admin: false, id: 1 });
  authenticateSession(this.application, { user_id: user.id });

  let event = server.create('github-event');
  page.visit({ id: event.id });

  andThen(() => {
    assert.equal(page.flashErrors().count, 1, 'Flash error was rendered');
    assert.equal(currentRouteName(), 'projects-list', 'Got redirected');
  });
});

test('Displays all the logged events', function(assert) {
  assert.expect(12);

  let user = server.create('user', { admin: true, id: 1 });
  let event = server.create('github-event', {
    action: 'labeled',
    error: 'Error',
    eventType: 'pull_request',
    failureReason: 'not_fully_implemented',
    githubDeliveryId: '71aeab80-9e59-11e7-81ac-198364bececc',
    insertedAt: moment(),
    payload: JSON.parse('{"key": "value"}'),
    recordData: 'Data',
    status: 'errored'
  });

  authenticateSession(this.application, { user_id: user.id });

  page.visit({ id: event.id });

  andThen(function() {
    assert.equal(currentURL(), '/admin/github/events/1');
    assert.equal(currentRouteName(), 'admin.github-events.github-event');
    assert.equal(page.eventTitle.text, `${event.eventType} ${event.action}`);
    assert.equal(page.githubDeliveryId.text, event.githubDeliveryId);
    assert.equal(page.time.text, moment(event.insertedAt).format('MM/DD/YYYY hh:mm:ss'));
    assert.equal(page.status.text, event.status);
    assert.equal(page.failureReason.text, event.failureReason);
    assert.equal(page.payload.text, '{ "key": "value" }');
    assert.equal(page.error.text, event.error);
    assert.equal(page.recordData.text, event.recordData);
    page.retryButton.click();
  });

  andThen(function() {
    assert.equal(page.flashMessages().count, 1, 'A flash was displayed');
    assert.equal(page.status.text, 'reprocessing', 'The event status changes');
  });
});
