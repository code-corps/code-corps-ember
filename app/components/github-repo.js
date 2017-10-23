import Ember from 'ember';

const {
  computed: { alias, notEmpty },
  Component
} = Ember;

export default Component.extend({
  classNames: ['github-repo'],
  classNameBindings: ['isConnected:github-repo--connected'],
  tagName: 'li',

  model: null,

  githubRepo: alias('model.githubRepo'),
  projectGithubRepo: alias('model.projectGithubRepo'),
  isConnected: notEmpty('model.projectGithubRepo'),

  isLoading: alias('githubRepo.isLoading'),
  name: alias('githubRepo.name')
});
