import {
  attribute,
  hasClass,
  triggerable
} from 'ember-cli-page-object';

export default {
  scope: '.conversation-part',

  body: {
    scope: '[data-test-body]'
  },

  photo: {
    scope: '[data-test-target-photo]',
    url: attribute('src')
  },

  photoContainer: {
    scope: '[data-test-target-photo-container]',
    mouseenter: triggerable('mouseenter')
  },

  sentAt: {
    scope: '[data-test-sent-at]'
  },

  sentByCurrentUser: hasClass('conversation-part--is-self')
};
