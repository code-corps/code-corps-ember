import { collection, create, hasClass, visitable } from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin/github/events'),

  flashErrors: collection({
    itemScope: '.flash > div.alert-danger'
  }),

  logItems: collection({
    itemScope: '[data-test-log-row]',
    item: {
      action: {
        scope: '[data-test-action]'
      },
      eventType: {
        scope: '[data-test-event-type]'
      },
      failureReason: {
        scope: '[data-test-failure-reason]'
      },
      status: {
        scope: '[data-test-status]'
      },
      time: {
        scope: '[data-test-time]'
      }
    }
  }),

  next: {
    scope: '[data-test-next]',
    isDisabled: hasClass('disabled')
  },

  prev: {
    scope: '[data-test-prev]',
    isDisabled: hasClass('disabled')
  }
});
