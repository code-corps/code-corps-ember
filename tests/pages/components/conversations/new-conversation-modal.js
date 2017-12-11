import { clickable, collection, fillable, hasClass } from 'ember-cli-page-object';

export default {
  scope: '.new-conversation-modal-container',

  openButton: {
    scope: '[data-test-open-button]'
  },

  modal: {
    testContainer: '.ember-modal-wrapper',
    scope: '.new-conversation-modal',
    resetScope: true,

    body: {
      scope: '[data-test-body]',
      fillIn: fillable('textarea'),
      isErrored: hasClass('has-error'),
      errors: collection({
        itemScope: '.input-error'
      })
    },

    subject: {
      scope: '[data-test-subject]',
      fillIn: fillable('input'),
      isErrored: hasClass('has-error'),
      errors: collection({
        itemScope: '.input-error'
      })
    },

    close: clickable('.modal-close'),
    save: clickable('[data-test-submit]')
  }
};
