import { fillable, is, isVisible, triggerable } from 'ember-cli-page-object';
import { clickable } from 'code-corps-ember/tests/pages/helpers/clickable-native';

export default {
  scope: '.github__repo-disconnect-confirm-modal',

  openButton: {
    scope: 'button'
  },

  modal: {
    testContainer: '.ember-modal-wrapper',
    scope: '.modal',
    resetScope: true,
    isVisible: isVisible(),

    disconnectButton: {
      scope: 'button',
      isDisabled: is(':disabled')
    },

    hitEscape: triggerable('keydown', '', { eventProperties: { keyCode: 27 } }),

    input: {
      scope: 'input',
      fillIn: fillable()
    }
  },

  overlay: {
    testContainer: '.ember-modal-wrapper',
    scope: '.ember-modal-overlay',
    resetScope: true,
    click: clickable
  }
};
