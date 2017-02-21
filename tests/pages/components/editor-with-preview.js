import {
  attribute,
  clickable,
  fillable,
  hasClass,
  isVisible,
  text,
  triggerable,
  value
} from 'ember-cli-page-object';
import codeThemeSelector from 'code-corps-ember/tests/pages/components/code-theme-selector';

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

  focus: triggerable('focus', 'textarea'),

  isEditing: hasClass('editing'),
  isPreviewing: hasClass('previewing'),

  spinnerIsVisible: isVisible('.spinner'),

  style: attribute('style'),

  textarea: {
    scope: 'textarea',
    fillIn: fillable(),
    isFocused: hasClass('focused'),
    placeholder: attribute('placeholder'),
    value: value()
  }
};
