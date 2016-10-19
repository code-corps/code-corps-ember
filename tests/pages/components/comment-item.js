import {
  clickable,
  collection,
  fillable
} from 'ember-cli-page-object';

export default {
  scope: '.comment-item',

  clickEdit: clickable('.edit'),
  clickSave: clickable('.save'),

  commentBody: {
    scope: '.comment-body p'
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
  })
};
