import {
  attribute,
  clickable,
  hasClass,
  isVisible,
  text
} from 'ember-cli-page-object';
import codeThemeSelector from 'code-corps-ember/tests/pages/components/code-theme-selector';
import submittableTextarea from 'code-corps-ember/tests/pages/components/submittable-textarea';

export default {
  scope: '.editor-with-preview',

  bodyPreview: {
    scope: '.body-preview',
    text: text()
  },

  clickEdit: clickable('.edit'),
  clickPreview: clickable('.preview'),

  codeThemeSelector,

  editButton: {
    scope: 'button.edit',
    isActive: hasClass('active')
  },

  textarea: submittableTextarea,

  isEditing: hasClass('editing'),
  isPreviewing: hasClass('previewing'),

  spinnerIsVisible: isVisible('.spinner'),

  style: attribute('style')
};
