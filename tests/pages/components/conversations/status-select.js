import {
  hasClass
} from 'ember-cli-page-object';

export default {
  scope: '.conversations__status-select',

  closedButton: {
    scope: '[data-test-closed-selector]',

    isActive: hasClass('active')
  },

  closedLink: {
    scope: '[data-test-closed-link]',

    isActive: hasClass('active')
  },

  openButton: {
    scope: '[data-test-open-selector]',

    isActive: hasClass('active')
  },

  openLink: {
    scope: '[data-test-open-link]',

    isActive: hasClass('active')
  }
};
