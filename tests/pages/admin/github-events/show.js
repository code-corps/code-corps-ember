import { create, visitable } from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin/github/events/:id'),

  eventTitle: {
    scope: '[data-test-event-title]'
  },

  failureReason: {
    scope: '[data-test-failure-reason]'
  },

  githubDeliveryId: {
    scope: '[data-test-github-delivery-id]'
  },

  payload: {
    scope: '[data-test-payload]'
  },

  status: {
    scope: '[data-test-status]'
  },

  time: {
    scope: '[data-test-time]'
  }
});
