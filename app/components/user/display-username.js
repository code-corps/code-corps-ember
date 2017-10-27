import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { get, computed } from '@ember/object';

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
