import { attribute, collection, create, visitable } from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin/projects'),

  flashMessages: collection({
    itemScope: '.flash > div'
  }),

  flashErrors: collection({
    itemScope: '.flash >div.alert-danger'
  }),

  items: collection({
    itemScope: '[data-test-log-row]',
    item: {
      actions: {
        scope: '[data-test-actions]',
        approve: {
          scope: 'button'
        }
      },
      approvalStatus: {
        scope: '[data-test-approval-status]'
      },
      icon: {
        scope: '[data-test-icon]',
        src: attribute('src', 'img')
      },
      title: {
        scope: '[data-test-title]'
      }
    }
  })
});
