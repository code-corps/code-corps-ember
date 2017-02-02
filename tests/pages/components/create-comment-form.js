import {
  clickable,
  collection,
  fillable,
  isVisible,
  triggerable
} from 'ember-cli-page-object';

export default {
  scope: '.create-comment-form',

  clickSave: clickable('button[name=save]'),

  editor: {
    scope: '.editor-with-preview',

    hitCtrlEnter: triggerable('keydown', 'textarea[name=markdown]', { eventProperties: { keyCode: 13, ctrlKey: true } }),

    bodyPreview: {
      scope: '.body-preview'
    },

    clickPreview: clickable('.preview'),

    markdown: fillable('textarea[name=markdown]')
  },

  errors: collection({
    itemScope: '.error'
  }),

  rendersLogin: isVisible('a[href$=login]'),
  rendersMarkdown: isVisible('[name=markdown]'),
  rendersSaveButton: isVisible('[name=save]'),
  rendersSignup: isVisible('a[href$=signup]')
};
