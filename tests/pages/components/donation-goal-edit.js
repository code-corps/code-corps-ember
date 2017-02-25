import {
  clickable,
  fillable,
  isVisible
} from 'ember-cli-page-object';

export default {
  cancelButtonIsVisible: isVisible('.cancel'),

  clickCancel: clickable('.cancel'),
  clickSave: clickable('.save'),

  fillInAmount: fillable('.amount'),
  fillInDescription: fillable('.description')
};
