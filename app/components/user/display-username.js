import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias },
  get
} = Ember;

export default Component.extend({
  tagName: 'span',
  classNames: ['user__display-username'],

  user: null,

  githubUsername: alias('user.githubUsername'),
  username: alias('user.username'),

  githubUserUrl: computed('githubUsername', function() {
    return `https://www.github.com/${get(this, 'githubUsername')}`;
  })
});
