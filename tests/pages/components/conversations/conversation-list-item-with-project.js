import {
  attribute
} from 'ember-cli-page-object';

export default {
  scope: '.conversation-list-item',

  project: {
    photo: {
      scope: '[data-test-project-icon]',
      url: attribute('src')
    },

    title: {
      scope: '[data-test-project-title]'
    }
  },

  updatedAt: {
    scope: '[data-test-updated-at]'
  }
};
