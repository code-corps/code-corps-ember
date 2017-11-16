import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from '../pages/admin/github-events/show';
import moment from 'moment';

moduleForAcceptance('Acceptance | Admin | GitHub Event | Show');

test('Displays all the logged events', function(assert) {
  assert.expect(10);

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
  });
});
