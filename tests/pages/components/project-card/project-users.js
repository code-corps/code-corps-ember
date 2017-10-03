import {
  collection
} from 'ember-cli-page-object';

export default {
  scope: '.project-card__project-users',

  userCount: {
    scope: '[data-test-count]'
  },

  users: collection({
    itemScope: '[data-test-user]'
  })
};
