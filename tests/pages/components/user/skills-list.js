import {
  collection
} from 'ember-cli-page-object';

export default {
  scope: '.user__skills-list',

  emptyState: {
    scope: '[data-test-user-skills-list-empty-state]'
  },

  skills: collection('[data-test-user-skills-list-item]')
};
