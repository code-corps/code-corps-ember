import {
  clickable,
  fillable,
  isVisible
} from 'ember-cli-page-object';

export default {
  scope: '.donation-goal-edit',

  cancelButtonIsVisible: isVisible('.cancel'),

  clickCancel: clickable('.cancel'),
  clickSave: clickable('.save'),

  fillInAmount: fillable('.amount'),
  fillInDescription: fillable('.description')
};
