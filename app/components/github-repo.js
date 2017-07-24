import Ember from 'ember';

const {
  computed,
  computed: { alias, mapBy, notEmpty },
  Component,
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['github-repo'],
  classNameBindings: ['isConnected:github-repo--connected'],
  tagName: 'li',

  isLoading: alias('githubRepo.isLoading'),
  name: alias('githubRepo.name'),

  githubRepo: null,
  project: null,

  store: service(),

  isConnected: notEmpty('projectsGithubRepo'),
  projectGithubRepo: computed('projectGithubRepos.@each', 'projectGithubRepos.isFulfilled', 'githubRepo.id', function() {
    return get(this, 'projectGithubRepos').find((projectGithubRepo) => {
      return projectGithubRepo.belongsTo('githubRepo').id() === get(this, 'githubRepo.id');
    });
  }),
  projectGithubRepos: alias('project.projectGithubRepos'),
  projectsGithubRepo: computed('projectsGithubRepos.@each', 'projectsGithubRepos.@each.isFulfilled', 'githubRepo', function() {
    let projectsGithubRepos = get(this, 'projectsGithubRepos');
    return projectsGithubRepos.find((githubRepo) => {
      return get(githubRepo, 'id') === get(this, 'githubRepo.id');
    });
  }),
  projectsGithubRepos: mapBy('projectGithubRepos', 'githubRepo'),

  actions: {
    connect() {
      let githubRepo = get(this, 'githubRepo');
      let project = get(this, 'project');
      return get(this, 'store').createRecord('project-github-repo', { project, githubRepo }).save();
    },

    remove(projectGithubRepo) {
      return projectGithubRepo.destroyRecord();
    }
  }
});
