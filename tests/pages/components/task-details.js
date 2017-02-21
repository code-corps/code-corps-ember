import {
  clickable,
  isVisible,
  text
} from 'ember-cli-page-object';
import codeThemeSelector from 'code-corps-ember/tests/pages/components/code-theme-selector';
import editorWithPreview from 'code-corps-ember/tests/pages/components/editor-with-preview';

export default {
  scope: '.task-details',

  cancel: {
    scope: '.cancel',
    click: clickable(),
    isVisible: isVisible()
  },

  codeThemeSelector,

  commentBody: {
    scope: '.comment-body',
    hasStrongText: isVisible('strong'),
    text: text()
  },

  edit: {
    scope: '.edit',
    click: clickable(),
    isVisible: isVisible()
  },

  editorWithPreview,

  save: {
    scope: '.save',
    click: clickable(),
    isVisible: isVisible()
  }
};
