import {
  hasClass
} from 'ember-cli-page-object';

export default {

  scope: '.conversation-part-closed',

  closedAt: {
    scope: '[data-test-closed-at]'
  },

  sentByCurrentUser: hasClass('conversation-part-closed--is-self')

};
