import { isVisible, triggerable } from 'ember-cli-page-object';
import relatedSkills from 'code-corps-ember/tests/pages/components/related-skills';

export default {
  scope: '.project-join-modal-container',
  openButton: {
    scope: 'button'
  },

  // NOTE: For the modal properties to work, the modal needs to be rendered
  // with the option renderInPlace=true. At the moment of implementing this,
  // there seems to be no problem with this approach, in styling or functionally
  modalVisible: isVisible('.project-join-modal'),

  modal: {
    scope: '.project-join-modal',
    joinProjectButton: {
      scope: 'button'
    },
    hitEscape: triggerable('keydown', '', { eventProperties: { keyCode: 27 } }),
    relatedSkills
  },

  overlay: {
    scope: '.ember-modal-overlay'
  }
};
