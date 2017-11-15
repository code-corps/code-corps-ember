import { computed, get, getProperties, set } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import RepoSyncProgressMixin from 'code-corps-ember/mixins/repo-sync-progress';
import { task, timeout } from 'ember-concurrency';

export default Component.extend(RepoSyncProgressMixin, {
  classNames: ['github-repo'],
  classNameBindings: [
    'belongsToOtherProject:github-repo--belongs-to-other-project',
    'belongsToProject:github-repo--belongs-to-project',
    'isConnected:github-repo--connected',
    'showingSettings:github-repo--expanded'
  ],
  tagName: 'li',

  githubRepo: null,
  project: null,
  showSettings: false,

  belongsToOtherProject: computed('githubRepo.project.id', 'project.id', function() {
    let projectId = get(this, 'project.id');
    let connectedProjectId = get(this, 'githubRepo.project.id');
    return (connectedProjectId && (projectId !== connectedProjectId));
  }),
  belongsToProject: computed('githubRepo.project.id', 'project.id', function() {
    return get(this, 'githubRepo.project.id') === get(this, 'project.id');
  }),
  isConnected: notEmpty('githubRepo.project.id'),
  repoIcon: computed('isConnected', 'syncInProgress', function() {
    let isConnected = get(this, 'isConnected');
    let syncInProgress = get(this, 'syncInProgress');
    if (syncInProgress) {
      return 'github-repo-pull-48';
    } else if (isConnected) {
      return 'github-repo-clone-48';
    } else {
      return 'github-repo-48';
    }
  }),

  pollServerForChanges: task(function* () {
    let syncing = get(this, 'syncing');
    let syncComplete = get(this, 'syncComplete');
    let errored = get(this, 'errored');
    let isConnected = get(this, 'isConnected');
    if (!isConnected) {
      return;
    }
    while (syncing && !syncComplete && !errored) {
      yield timeout(2000);  // wait 2 seconds

      let githubRepo = get(this, 'githubRepo');
      let repoIsLoading = get(githubRepo, 'isLoading');

      if (githubRepo && !repoIsLoading) {
        githubRepo.reload();
      }
    }
  }).on('didRender').cancelOn('willDestroyElement').restartable(),

  click() {
    let { belongsToProject, isConnected }
      = getProperties(this, 'belongsToProject', 'isConnected');

    if (!isConnected || (isConnected && belongsToProject)) {
      this.toggleProperty('showSettings');
    }
  },

  actions: {
    connectRepo(githubRepo, project) {
      // Send the action to connect
      this.sendAction('connectRepo', githubRepo, project);
    },

    disconnectRepo(githubRepo) {
      // Send the action to disconnect
      this.sendAction('disconnectRepo', githubRepo);

      set(this, 'showSettings', false);
    }
  }
});
