import { notEmpty, alias } from '@ember/object/computed';
import Component from '@ember/component';

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
