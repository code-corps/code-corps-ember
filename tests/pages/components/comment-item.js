import {
  clickable,
  collection,
  fillable,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.comment-item',

  clickEdit: clickable('.edit'),
  clickSave: clickable('.save'),
  clickCancel: clickable('.cancel'),

  codeThemeSelectorVisible: isVisible('.code-theme-selector'),

  commentBody: {
    scope: '.comment-body'
  },

  editLink: {
    scope: '.edit'
  },

  editor: {
    scope: '.editor-with-preview',

    bodyPreview: {
      scope: '.body-preview p'
    },

    clickPreview: clickable('.preview'),

    markdown: fillable('textarea[name=markdown]')
  },

  errors: collection({
    itemScope: '.error'
  }),

  username: text('.username')
};
