import {
  collection
} from 'ember-cli-page-object';

export default {
  scope: '.project-card',

  memberCount: {
    scope: '.project-card-members .count'
  },

  members: collection({
    scope: '.project-card-members',
    itemScope: 'li.member'
  })
};
