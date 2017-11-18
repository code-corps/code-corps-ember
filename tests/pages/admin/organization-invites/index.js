import { collection, create, visitable } from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin/organization-invites'),

  flashMessages: collection({
    scope: '.flash-messages--full-width',
    itemScope: '.flash-message'
  }),

  flashErrors: collection({
    scope: '.flash-messages--full-width',
    itemScope: '.flash-message.alert-danger'
  }),

  logItems: collection({
    itemScope: '[data-test-log-row]',
    item: {
      actions: {
        scope: '[data-test-actions]',
        button: {
          scope: 'button'
        }
      },
      approvalStatus: {
        scope: '[data-test-approval-status]'
      },
      email: {
        scope: '[data-test-email]'
      },
      icon: {
        scope: '[data-test-icon]'
      },
      name: {
        scope: '[data-test-name]'
      }
    }
  })
});
