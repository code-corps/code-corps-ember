import {
  collection
} from 'ember-cli-page-object';

import projectJoinModal from 'code-corps-ember/tests/pages/components/project-join-modal';

export default {
  scope: '.project-card',

  memberCount: {
    scope: '.project-card-members .count'
  },

  members: collection({
    scope: '.project-card-members',
    itemScope: 'li.member'
  }),

  projectJoinModal
};
