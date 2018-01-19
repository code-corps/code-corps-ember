import { isVisible } from 'ember-cli-page-object';
import { clickable } from 'code-corps-ember/tests/pages/helpers/clickable-native';
import relatedSkills from 'code-corps-ember/tests/pages/components/related-skills';
import { triggerKeyDown } from 'ember-keyboard';

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

    hitEscape() {
      triggerKeyDown('Escape');
    },

    relatedSkills
  },

  overlay: {
    testContainer: '.ember-modal-wrapper',
    scope: '.ember-modal-overlay',
    resetScope: true,
    click: clickable
  }
};
