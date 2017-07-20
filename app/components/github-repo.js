import Ember from 'ember';
import recordsList from 'code-corps-ember/utils/records-list';

const {
  computed: { alias },
  computed,
  Component,
  get
} = Ember;

export default Component.extend({
  classNames: ['github-repo'],
  classNameBindings: ['isConnected:github-repo--connected'],
  tagName: 'li',

  model: null,

  githubRepo: alias('model.githubRepo'),
  projectGithubRepo: alias('model.projectGithubRepo'),

  isLoading: alias('githubRepo.isLoading'),
  name: alias('githubRepo.name'),

  isConnected: computed('githubRepo', 'project.projectGithubRepos.@each', function() {
    let githubRepo = get(this, 'githubRepo');
    let projectGithubRepos = get(this, 'project.projectGithubRepos');
    if (projectGithubRepos) {
      return recordsList.includes(projectGithubRepos, githubRepo);
    }
  })
});
