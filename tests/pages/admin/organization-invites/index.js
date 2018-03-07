import { collection, create, visitable } from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin/organization-invites'),

  flashMessages: collection('.flash-messages--full-width', '.flash-message'),

  flashErrors: collection('.flash-messages--full-width .flash-message.alert-danger'),

  logItems: collection('[data-test-log-row]', {
    actions: {
      scope: '[data-test-actions]',
      button: { scope: 'button' }
    },
    approvalStatus: { scope: '[data-test-approval-status]' },
    email: { scope: '[data-test-email]' },
    icon: { scope: '[data-test-icon]' },
    name: { scope: '[data-test-name]' }
  })
});
