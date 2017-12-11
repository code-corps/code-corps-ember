import {
  attribute
} from 'ember-cli-page-object';

export default {
  scope: '.conversation-list-item',

  target: {
    name: {
      scope: '[data-test-target-name]'
    },

    photo: {
      scope: '[data-test-target-photo]',
      url: attribute('src')
    },

    username: {
      scope: '[data-test-target-username]'
    }
  },

  updatedAt: {
    scope: '[data-test-updated-at]'
  }
};
