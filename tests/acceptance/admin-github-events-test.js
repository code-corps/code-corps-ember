import { test } from 'qunit';
import moduleForAcceptance from 'code-corps-ember/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';
import page from '../pages/admin/github-events/index';

moduleForAcceptance('Acceptance | Admin | GitHub Events | Index');

test('The page requires logging in', function(assert) {
  assert.expect(1);

  page.visit();

  andThen(() => {
    assert.equal(currentRouteName(), 'login', 'Got redirected to login');
  });
});

test('The page requires user to be admin', function(assert) {
  assert.expect(2);

  let user = server.create('user', { admin: false, id: 1 });
  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    assert.equal(page.flashErrors().count, 1, 'Flash error was rendered');
    assert.equal(currentRouteName(), 'projects-list', 'Got redirected');
  });
});

test('Displays all the logged events', function(assert) {
  assert.expect(16);

  let user = server.create('user', { admin: true, id: 1 });
  let githubEvents = server.createList('github-event', 25);

  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(function() {
    assert.equal(currentURL(), '/admin/github/events');
    assert.equal(currentRouteName(), 'admin.github-events.index');
    assert.equal(page.logItems().count, 20, 'There are 20 log rows by default.');
    assert.equal(page.logItems(0).action.text, githubEvents[0].action);
    assert.equal(page.logItems(0).eventType.text, githubEvents[0].eventType);
    assert.equal(page.logItems(0).failureReason.text, githubEvents[0].failureReason);
    assert.equal(page.logItems(0).status.text, githubEvents[0].status);
    assert.ok(page.logItems(0).time.isVisible);
    assert.ok(page.prev.isDisabled, 'Previous button is disabled.');
    assert.notOk(page.next.isDisabled, 'Next button is not disabled.');
    page.next.click();
  });

  andThen(function() {
    assert.equal(page.logItems().count, 5, 'There are 5 log rows after navigating to the second page.');
    assert.notOk(page.prev.isDisabled, 'Previous button is not disabled.');
    assert.ok(page.next.isDisabled, 'Next button is disabled.');
    page.prev.click();
  });

  andThen(function() {
    assert.equal(page.logItems().count, 20, 'There are 20 log rows after navigating back.');
    assert.ok(page.prev.isDisabled, 'Previous button is disabled.');
    assert.notOk(page.next.isDisabled, 'Next button is not disabled.');
  });
});

test('Filters the logged events', function(assert) {
  assert.expect(16);

  let user = server.create('user', { admin: true, id: 1 });
  server.create('github-event');
  let expectedEvent = server.create('github-event', { action: 'opened', status: 'errored', eventType: 'issues' });

  authenticateSession(this.application, { user_id: user.id });

  page.visit();

  andThen(() => {
    assert.equal(page.logItems().count, 2, 'There are 2 log rows by default.');
    page.filterStatus.fillIn('errored');
    assert.notOk(page.filterAction.isVisible, 'Action filter is not visible.');
  });

  andThen(() => {
    assert.equal(page.logItems().count, 1, 'There are 1 log rows after filtering.');
    assert.equal(page.logItems(0).action.text, expectedEvent.action);
    assert.equal(page.logItems(0).eventType.text, expectedEvent.eventType);
    assert.equal(page.logItems(0).status.text, expectedEvent.status);
    assert.notOk(page.filterAction.isVisible, 'Action filter is not visible.');
    page.filterType.fillIn('issues');
  });

  andThen(() => {
    assert.equal(page.logItems().count, 1, 'There are 1 log rows after filtering.');
    assert.equal(page.logItems(0).action.text, expectedEvent.action);
    assert.equal(page.logItems(0).eventType.text, expectedEvent.eventType);
    assert.equal(page.logItems(0).status.text, expectedEvent.status);
    assert.ok(page.filterAction.isVisible, 'Action filter is visible.');
    page.filterStatus.fillIn('opened');
  });

  andThen(() => {
    assert.equal(page.logItems().count, 1, 'There are 1 log rows after filtering.');
    assert.equal(page.logItems(0).action.text, expectedEvent.action);
    assert.equal(page.logItems(0).eventType.text, expectedEvent.eventType);
    assert.equal(page.logItems(0).status.text, expectedEvent.status);
  });
});
