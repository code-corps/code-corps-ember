import { attribute, collection, create, visitable } from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin/projects'),

  flashErrors: collection('.flash-messages--full-width .flash-message.alert-danger'),

  flashMessages: collection('.flash-messages--full-width .flash-message'),

  items: collection('[data-test-log-row]', {
    actions: {
      scope: '[data-test-actions]',
      approve: { scope: 'button' }
    },
    approvalStatus: { scope: '[data-test-approval-status]' },
    icon: {
      scope: '[data-test-icon]',
      src: attribute('src', 'img')
    },
    title: { scope: '[data-test-title]' }
  })
});
