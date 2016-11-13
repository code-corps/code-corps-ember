import {
  clickable,
  fillable,
  hasClass,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.project-long-description',

  clickEdit: clickable('button[name=edit]'),
  clickSave: clickable('button[name=save]'),

  textarea: fillable('textarea'),

  editButton: {
    scope: 'button[name=edit]'
  },

  longDescription: {
    scope: '.long-description',

    text: text(),
    isEmpty: hasClass('empty'),

    paragraph: {
      scope: 'p',
      text: text()
    }
  }
};
