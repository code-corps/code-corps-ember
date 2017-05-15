import { isVisible, triggerable } from 'ember-cli-page-object';
import { clickable } from 'code-corps-ember/tests/pages/helpers/clickable-native';
import relatedSkills from 'code-corps-ember/tests/pages/components/related-skills';

export default {
  scope: '.project-join-modal-container',
  openButton: {
    scope: 'button'
  },

  modal: {
    testContainer: '.ember-modal-wrapper',
    scope: '.project-join-modal',
    resetScope: true,
    isVisible: isVisible(),
    joinProjectButton: {
      scope: 'button'
    },
    hitEscape: triggerable('keydown', '', { eventProperties: { keyCode: 27 } }),
    relatedSkills
  },

  overlay: {
    testContainer: '.ember-modal-wrapper',
    scope: '.ember-modal-overlay',
    resetScope: true,
    click: clickable
  }
};
