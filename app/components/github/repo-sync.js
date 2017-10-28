import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { alias } from '@ember/object/computed';

const TOTAL_STEPS = 7;

export default Component.extend({
  classNames: ['github__repo-sync'],

  githubRepo: null,

  errored: computed('state', function() {
    let state = get(this, 'state');
    return state && state.indexOf('error') > -1;
  }),

  percentage: computed('stepNumber', function() {
    let stepNumber = get(this, 'stepNumber');
    return (stepNumber / TOTAL_STEPS) * 100;
  }),

  state: alias('githubRepo.syncState'),

  stepNumber: computed('state', function() {
    let state = get(this, 'state');
    switch (state) {
      case 'unsynced':
        return 0;
      case 'fetching_pull_requests':
      case 'errored_fetching_pull_requests':
        return 1;
      case 'syncing_pull_requests':
      case 'errored_syncing_pull_requests':
        return 2;
      case 'fetching_issues':
      case 'errored_fetching_issues':
        return 3;
      case 'syncing_issues':
      case 'errored_syncing_issues':
        return 4;
      case 'fetching_comments':
      case 'errored_fetching_comments':
        return 5;
      case 'syncing_comments':
      case 'errored_syncing_comments':
        return 6;
      case 'receiving_webhooks':
        return 7;
      default:
        return 0;
    }
  }),

  syncing: computed('errored', 'stepNumber', function() {
    let errored = get(this, 'errored');
    let stepNumber = get(this, 'stepNumber');
    return !errored && (stepNumber > 0) && ((TOTAL_STEPS - stepNumber) >= 1);
  })
});
