import {
  hasClass
} from 'ember-cli-page-object';

export default {

  scope: '.conversation-part-closed',

  closedAt: {
    scope: '[data-test-closed-at]'
  },

  closedByCurrentUser: hasClass('conversation-part-closed--is-self')
};
