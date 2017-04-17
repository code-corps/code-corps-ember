import {
  clickable,
  fillable,
  hasClass,
  text
} from 'ember-cli-page-object';
import editorWithPreview from 'code-corps-ember/tests/pages/components/editor-with-preview';

export default {
  scope: '.project-long-description',

  clickEdit: clickable('button[name=edit]'),
  clickSave: clickable('button[name=save]'),

  edit: {
    scope: 'button[name=edit]'
  },

  editorWithPreview,

  fillInTextarea: fillable('textarea'),

  longDescription: {
    scope: '.long-description',

    isEmpty: hasClass('empty'),

    paragraph: {
      scope: 'p',
      text: text()
    },

    strong: {
      scope: 'strong',
      text: text()
    },

    list: {
      scope: 'ul',
      text: text(),

      listItem: {
        scope: 'li',
        text: text()
      }
    },

    text: text()
  },

  noDescription: {
    scope: '.no-description',
    canAdd: hasClass('user-can-add'),
    cannotAdd: hasClass('user-cannot-add')
  },

  save: {
    scope: 'button[name=save]'
  }
};
