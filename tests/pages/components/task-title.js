import {
  clickable,
  fillable,
  hasClass,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.task-title',
  
  isEditing: hasClass('editing'),

  cancel: {
    scope: '.cancel',
    click: clickable(),
    isVisible: isVisible()
  },

  edit: {
    scope: '.edit',
    click: clickable(),
    isVisible: isVisible()
  },

  save: {
    scope: '.save',
    click: clickable(),
    isVisible: isVisible()
  },

  title: {
    scope: '.title',
    isVisible: isVisible(),
    text: text()
  },

  titleInput: {
    scope: 'input[name=title]',
    fillIn: fillable(),
    isVisible: isVisible()
  }
};
