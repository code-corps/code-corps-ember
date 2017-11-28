import {
  clickable,
  collection,
  create,
  fillable,
  value,
  visitable
} from 'ember-cli-page-object';

import imageDrop from 'code-corps-ember/tests/pages/components/image-drop';
import navigationMenu from 'code-corps-ember/tests/pages/components/navigation-menu';

export default create({
  visit: visitable('organizations/new'),

  flashMessages: collection({
    itemScope: '.flash > div'
  }),

  inviteCodeForm: {
    scope: '[data-test-invite-code-form]',

    clickSubmit: clickable('[data-test-submit]'),

    errors: collection({
      itemScope: '.input-group.has-error'
    }),

    inputCode: fillable('[name=code]')
  },

  navigationMenu,

  organizationForm: {
    scope: '[data-test-organization-form]',

    clickSubmit: clickable('[data-test-submit]'),

    errors: collection({
      itemScope: '.input-group.has-error'
    }),

    imageDrop,

    inputDescription: fillable('[name=description]'),
    inputName: fillable('[name=name]'),

    name: value('[name=name]')
  }
});
