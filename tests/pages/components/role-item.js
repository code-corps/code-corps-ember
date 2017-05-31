import { hasClass, notHasClass } from 'ember-cli-page-object';

export default {
  scope: '.role-item',

  isSelected: hasClass('selected'),
  isUnselected: notHasClass('selected'),

  button: {
    scope: 'button'
  },

  icon: {
    scope: 'span',
    isLoading: hasClass('button-spinner')
  }
};
