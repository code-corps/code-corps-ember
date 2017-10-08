import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias },
  getProperties
} = Ember;

export default Component.extend({
  classNames: ['github__issue-link'],

  size: 'large',

  repoName: alias('githubRepo.name'),
  repoOwner: alias('githubRepo.githubAccountLogin'),

  url: computed('repoOwner', 'repoName', 'number', function() {
    let { repoOwner, repoName, number } = getProperties(this, 'repoOwner', 'repoName', 'number');
    return `https://www.github.com/${repoOwner}/${repoName}/issues/${number}`;
  })
});
