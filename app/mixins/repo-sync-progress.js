import { alias } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { computed, get } from '@ember/object';

const TOTAL_STEPS = 9;

export default Mixin.create({
  githubRepo: null,
  projectGithubRepo: null,
  triggeredSync: false,

  errored: computed('projectRepoState', 'repoState', function() {
    let projectRepoState = get(this, 'projectRepoState');
    let repoState = get(this, 'repoState');
    return (repoState && repoState.indexOf('error') > -1)
        || (projectRepoState && projectRepoState.indexOf('error') > -1);
  }),

  overallSyncState: computed('projectRepoState', 'repoState', 'triggeredSync', function() {
    let projectRepoState = get(this, 'projectRepoState');
    let repoState = get(this, 'repoState');

    let state = projectRepoState;

    if (!state
        || state === 'unsynced'
        || state === 'syncing_github_repo'
        || state === 'errored_syncing_github_repo') {
      state = repoState;
    }

    if (!projectRepoState && repoState === 'receiving_webhooks' && get(this,  'triggeredSync')) {
      state = 'unsynced';
    }

    return state;
  }),

  percentage: computed('stepNumber', function() {
    let stepNumber = get(this, 'stepNumber');
    return (stepNumber / TOTAL_STEPS) * 100;
  }),

  projectRepoState: alias('projectGithubRepo.syncState'),
  repoState: alias('githubRepo.syncState'),

  stepNumber: computed('overallSyncState', function() {
    let state = get(this, 'overallSyncState');

    switch (state) {
      case 'unsynced':
        return 0;
      case 'fetching_pull_requests':
      case 'errored_fetching_pull_requests':
        return 1;
      case 'syncing_github_pull_requests':
      case 'errored_syncing_github_pull_requests':
        return 2;
      case 'fetching_issues':
      case 'errored_fetching_issues':
        return 3;
      case 'syncing_github_issues':
      case 'errored_syncing_github_issues':
        return 4;
      case 'fetching_comments':
      case 'errored_fetching_comments':
        return 5;
      case 'syncing_github_comments':
      case 'errored_syncing_github_comments':
      case 'receiving_webhooks':
        return 6;
      case 'syncing_tasks':
      case 'errored_syncing_tasks':
        return 7;
      case 'syncing_comments':
      case 'errored_syncing_comments':
        return 8;
      case 'synced':
        return 9;
      default:
        return 0;
    }
  }),

  syncing: computed('errored', 'stepNumber', function() {
    let errored = get(this, 'errored');
    let stepNumber = get(this, 'stepNumber');
    return !errored && ((TOTAL_STEPS - stepNumber) >= 1);
  }),

  syncComplete: computed('projectRepoState', function() {
    let projectRepoState = get(this, 'projectRepoState');
    return projectRepoState === 'synced';
  }),

  syncIncomplete: computed('repoState', 'projectRepoState', 'triggeredSync', function() {
    let repoState = get(this, 'repoState');
    let projectRepoState = get(this, 'projectRepoState');
    let triggeredSync = get(this, 'triggeredSync');

    if (triggeredSync && projectRepoState !== 'synced') {
      return true;
    } else if (projectRepoState) {
      return projectRepoState !== 'unsynced'
          && projectRepoState !== 'synced';
    } else if (!projectRepoState) {
      return repoState !== 'unsynced' && repoState !== 'receiving_webhooks';
    } else {
      return repoState !== 'unsynced';
    }
  })
});
