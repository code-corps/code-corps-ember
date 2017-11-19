import {
  hasClass,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.task-status',

  iconClosed: {
    scope: '[data-test-closed-icon]'
  },

  iconOpen: {
    scope: '[data-test-open-icon]'
  },

  iconPullRequest: {
    scope: '[data-test-pull-request-icon]'
  },

  iconPullRequestMerged: {
    scope: '[data-test-pull-request-merged-icon]'
  },

  isClosed: hasClass('closed'),
  isMerged: hasClass('merged'),
  isOpen: hasClass('open'),
  statusText: text()
};
