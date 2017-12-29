import { collection, create, fillable, hasClass, visitable } from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin/github/events'),

  clear: {
    scope: '[data-test-clear-filters]'
  },

  filterAction: {
    scope: '[data-test-filter-action]',
    fillIn: fillable()
  },

  filterStatus: {
    scope: '[data-test-filter-status]',
    fillIn: fillable()
  },

  filterType: {
    scope: '[data-test-filter-type]',
    fillIn: fillable()
  },

  flashErrors: collection({
    scope: '.flash-messages--full-width',
    itemScope: '.flash-message.alert-danger'
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
