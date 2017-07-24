import Ember from 'ember';
import recordsList from 'code-corps-ember/utils/records-list';

const {
  computed,
  computed: { alias, map, mapBy, notEmpty },
  Component,
  get,
  getProperties,
  inject: { service },
  isPresent
} = Ember;

export default Component.extend({
  classNames: ['github-app-installation'],

  store: service(),

  constructGithubRepoItem(githubRepo, projectGithubRepo) {
    return {
      githubRepo,
      isConnected: isPresent(projectGithubRepo),
      name: get(githubRepo, 'name'),
      projectGithubRepo
    }
  },

  githubReposCollection: computed('projectGithubRepos.isFulfilled', 'projectGithubRepos.@each.isFulfilled', function() {
    let { githubRepos, project, projectGithubRepos } = getProperties(this, 'githubRepos', 'project', 'projectGithubRepos');

    return githubRepos.map((githubRepo) => {
      let projectGithubRepo = recordsList.find(projectGithubRepos, githubRepo, project);
      return this.constructGithubRepoItem(githubRepo, projectGithubRepo);
    });
  }),
  projectGithubRepos: alias('project.projectGithubRepos'),

  actions: {
    connect(githubRepo, project) {
      return get(this, 'store').createRecord('project-github-repo', { project, githubRepo }).save();
    },

    remove(projectGithubRepo) {
      return projectGithubRepo.destroyRecord();
    },
  }
});
