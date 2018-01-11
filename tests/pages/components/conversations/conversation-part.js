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

  closedAt: {
    scope: '[data-test-closed-at]'
  },

  isComment: hasClass('conversation-part--comment'),
  isClosed: hasClass('conversation-part--closed'),
  isByCurrentUser: hasClass('conversation-part--is-self'),

  photo: {
    scope: '[data-test-target-photo]',
    url: attribute('src')
  },

  photoContainer: {
    scope: '[data-test-target-photo-container]',
    mouseenter: triggerable('mouseenter')
  },

  reopenedAt: {
    scope: '[data-test-reopened-at]'
  },

  sentAt: {
    scope: '[data-test-sent-at]'
  }
};
