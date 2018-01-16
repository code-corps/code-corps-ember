import {
  clickable,
  collection,
  create,
  fillable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('admin/organization-invites/new'),

  flashMessages: collection({
    scope: '.flash-messages--full-width',
    itemScope: '.flash-message'
  }),

  flashErrors: collection({
    scope: '.flash-messages--full-width',
    itemScope: '.flash-message.alert-danger'
  }),

  inviteForm: {
    scope: '[data-test-invite-form]',

    clickSubmit: clickable('[data-test-submit]'),

    errors: collection({
      itemScope: '.input-group.has-error'
    }),

    inputEmail: fillable('[name=email]'),
    inputOrganizationName: fillable('[name=organizationName]')
  },

  pageMenu: {
    scope: '[data-test-page-menu]',

    indexLink: {
      scope: '[data-test-index-link]'
    }
  }
});
