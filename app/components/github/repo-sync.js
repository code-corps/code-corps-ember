import Component from '@ember/component';
import RepoSyncProgressMixin from 'code-corps-ember/mixins/repo-sync-progress';

export default Component.extend(RepoSyncProgressMixin, {
  classNames: ['github__repo-sync'],

  githubRepo: null,
  projectGithubRepo: null
});
