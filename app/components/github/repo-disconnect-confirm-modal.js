import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { alias, not } from '@ember/object/computed';

export default Component.extend({
  classNames: ['github__repo-disconnect-confirm-modal'],

  githubRepo: null,
  typedGithubRepoName: '',

  githubRepoName: alias('githubRepo.name'),
  namesMatch: computed('githubRepoName', 'typedGithubRepoName', function() {
    let githubRepoName = get(this, 'githubRepoName');
    let typedGithubRepoName = get(this, 'typedGithubRepoName');
    return githubRepoName === typedGithubRepoName;
  }),
  submitDisabled: not('namesMatch'),

  actions: {
    disconnect() {
      this.sendAction('disconnect');
    }
  }
});
