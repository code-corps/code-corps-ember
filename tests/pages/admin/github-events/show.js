import { collection, create, visitable } from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin/github/events/:id'),

  flashErrors: collection({
    scope: '.flash-messages--full-width',
    itemScope: '.flash-message.alert-danger'
  }),

  error: {
    scope: '[data-test-error]'
  },

  eventTitle: {
    scope: '[data-test-event-title]'
  },

  failureReason: {
    scope: '[data-test-failure-reason]'
  },

  flashMessages: collection({
    scope: '.flash-messages--full-width',
    itemScope: '.flash-message'
  }),

  githubDeliveryId: {
    scope: '[data-test-github-delivery-id]'
  },

  payload: {
    scope: '[data-test-payload]'
  },

  recordData: {
    scope: '[data-test-record-data]'
  },

  retryButton: {
    scope: 'button'
  },

  status: {
    scope: '[data-test-status]'
  },

  time: {
    scope: '[data-test-time]'
  }
});
