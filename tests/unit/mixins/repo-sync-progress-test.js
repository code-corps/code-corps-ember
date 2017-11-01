import Object from '@ember/object';
import RepoSyncProgressMixin from 'code-corps-ember/mixins/repo-sync-progress';
import { module, test } from 'qunit';

module('Unit | Mixin | repo sync progress');

test('when githubRepo syncState has an error', function(assert) {
  let RepoSyncProgressObject = Object.extend(RepoSyncProgressMixin);
  let subject = RepoSyncProgressObject.create();
  let githubRepo = { syncState: 'errored_fetching_issues' };
  subject.set('githubRepo', githubRepo);
  assert.ok(subject.get('errored'));
});

test('when projectGithubRepo syncState has an error', function(assert) {
  let RepoSyncProgressObject = Object.extend(RepoSyncProgressMixin);
  let subject = RepoSyncProgressObject.create();
  let projectGithubRepo = { syncState: 'errored_fetching_issues' };
  subject.set('projectGithubRepo', projectGithubRepo);
  assert.ok(subject.get('errored'));
});

test('sets percentage for the stepNumber', function(assert) {
  let RepoSyncProgressObject = Object.extend(RepoSyncProgressMixin);
  let subject = RepoSyncProgressObject.create();
  subject.set('stepNumber', 9);
  assert.equal(subject.get('percentage'), '100');
});

test('when the repo is synced and the sync is triggered without having a projectGithubRepo yet', function(assert) {
  let RepoSyncProgressObject = Object.extend(RepoSyncProgressMixin);
  let subject = RepoSyncProgressObject.create();
  let githubRepo = { syncState: 'receiving_webhooks' };
  subject.set('githubRepo', githubRepo);
  subject.set('projectGithubRepo', null);
  subject.set('triggeredSync', true);
  assert.equal(subject.get('stepNumber'), 0);
});

test('when the sync is triggered and the project repo is not synced', function(assert) {
  let RepoSyncProgressObject = Object.extend(RepoSyncProgressMixin);
  let subject = RepoSyncProgressObject.create();
  let projectGithubRepo = { syncState: 'syncing_comments' };
  subject.set('projectGithubRepo', projectGithubRepo);
  subject.set('triggeredSync', true);
  assert.ok(subject.get('syncIncomplete'));
});

test('when errored', function(assert) {
  let RepoSyncProgressObject = Object.extend(RepoSyncProgressMixin);
  let subject = RepoSyncProgressObject.create();
  let githubRepo = { syncState: 'errored_fetching_issues' };
  subject.set('githubRepo', githubRepo);
  assert.notOk(subject.get('syncing'));
});

test('when not errored and unsynced', function(assert) {
  let RepoSyncProgressObject = Object.extend(RepoSyncProgressMixin);
  let subject = RepoSyncProgressObject.create();
  subject.set('stepNumber', 1);
  assert.ok(subject.get('syncing'));
});

test('when project repo is synced', function(assert) {
  let RepoSyncProgressObject = Object.extend(RepoSyncProgressMixin);
  let subject = RepoSyncProgressObject.create();
  let projectGithubRepo = { syncState: 'synced' };
  subject.set('projectGithubRepo', projectGithubRepo);
  assert.ok(subject.get('syncComplete'));
});
