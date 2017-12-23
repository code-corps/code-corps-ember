import { attribute, clickable, hasClass, property, triggerable } from 'ember-cli-page-object';

let radioButton = {
  scope: 'input[type="radio"]',

  isChecked: property('checked'),
  isDisabled: attribute('disabled')
};

export default {
  scope: '.project-user-role-modal-container',

  modal: {
    testContainer: '.ember-modal-wrapper',
    scope: '.project-user-role-modal',
    resetScope: true,

    close: clickable('[data-test-modal-close]'),

    radioGroupAdmin: {
      scope: '[data-test-radio-group-admin]',

      hasDisabledClass: hasClass('input-group--disabled'),
      radioButton
    },

    radioGroupContributor: {
      scope: '[data-test-radio-group-contributor]',

      hasDisabledClass: hasClass('input-group--disabled'),
      radioButton
    },

    radioGroupOwner: {
      scope: '[data-test-radio-group-owner]',

      adminCannotRemove: {
        scope: '[data-test-admin-cannot-remove]'
      },
      radioButton
    },

    save: clickable('[data-test-submit-button]')
  },

  openButton: {
    scope: '[data-test-open-button]',

    mouseenter: triggerable('mouseenter'),
    mouseleave: triggerable('mouseleave')
  }
};
