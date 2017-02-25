import {
  clickable,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.donation-goal',

  amount: {
    scope: '.amount',
    text: text()
  },

  click: clickable(),

  description: {
    scope: '.description',
    text: text()
  },

  editButton: {
    scope: '.edit',
    isVisible: isVisible()
  }
};
