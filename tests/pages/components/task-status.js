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

  isClosed: hasClass('closed'),
  isOpen: hasClass('open'),
  statusText: text()
};
