import { computed, get, set } from '@ember/object';
import { alias, notEmpty, or } from '@ember/object/computed';
import Component from '@ember/component';
import RepoSyncProgressMixin from 'code-corps-ember/mixins/repo-sync-progress';
import { task, timeout } from 'ember-concurrency';

export default Component.extend(RepoSyncProgressMixin, {
  classNames: ['github-repo'],
  classNameBindings: ['isConnected:github-repo--connected', 'showingSettings:github-repo--expanded'],
  tagName: 'li',

  githubRepo: null,
  project: null,
  projectGithubRepo: null,
  showSettings: false,

  isConnected: notEmpty('projectGithubRepo'),
  isLoading: alias('githubRepo.isLoading'),
  name: alias('githubRepo.name'),
  repoIcon: computed('isConnected', 'syncIncomplete', function() {
    let isConnected = get(this, 'isConnected');
    let syncIncomplete = get(this, 'syncIncomplete');
    if (syncIncomplete) {
      return 'github-repo-pull-48';
    } else if (isConnected) {
      return 'github-repo-clone-48';
    } else {
      return 'github-repo-48';
    }
  }),
  showingSettings: or('syncIncomplete', 'showSettings'),
  triggeredSync: alias('githubRepo.triggeredSync'),

  pollServerForChanges: task(function* () {
    let syncing = get(this, 'syncing');
    let syncComplete = get(this, 'syncComplete');
    let errored = get(this, 'errored');
    let githubRepo = get(this, 'githubRepo');
    let projectGithubRepo = get(this, 'projectGithubRepo');
    let triggeredSync = get(this, 'triggeredSync');
    if (!projectGithubRepo && !triggeredSync) {
      return;
    }
    while (syncing && !syncComplete && !errored) {
      yield timeout(2000);  // wait 2 seconds
      if (githubRepo) {
        githubRepo.reload();
      }
      if (projectGithubRepo) {
        projectGithubRepo.reload();
      }
    }
  }).on('didRender').cancelOn('willDestroyElement').restartable(),

  click() {
    this.toggleProperty('showSettings');
  },

  actions: {
    connectRepo(githubRepo, project) {
      // Set the virtual attr used to decide if we should show sync progress
      set(githubRepo, 'triggeredSync', true);

      // Send the action to connect
      this.sendAction('connectRepo', githubRepo, project);
    },

    disconnectRepo(githubRepo, projectGithubRepo) {
      // Unset the virtual attr used to decide if we should show sync progress
      set(githubRepo, 'triggeredSync', false);

      // Send the action to disconnect
      this.sendAction('disconnectRepo', projectGithubRepo);
    }
  }
});
