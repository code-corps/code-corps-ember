import Ember from 'ember';

const {
  computed: { alias },
  Component
} = Ember;

export default Component.extend({
  classNames: ['github-repo'],
  classNameBindings: ['isConnected:github-repo--connected'],
  tagName: 'li',

  isLoading: alias('githubRepo.isLoading'),

  githubRepo: null,
  projectGithubRepo: null,
  isConnected: null,
  name: null
});
