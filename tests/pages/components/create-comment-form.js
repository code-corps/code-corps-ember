import {
  clickable,
  collection,
  fillable
} from 'ember-cli-page-object';

export default {
  scope: '.create-comment-form',

  clickSave: clickable('button[name=save]'),

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
