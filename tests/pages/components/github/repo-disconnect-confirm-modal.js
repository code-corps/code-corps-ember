import { fillable, is, isVisible } from 'ember-cli-page-object';
import { clickable } from 'code-corps-ember/tests/pages/helpers/clickable-native';
import { triggerKeyDown } from 'ember-keyboard';

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

    hitEscape() {
      triggerKeyDown('Escape');
    },

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
