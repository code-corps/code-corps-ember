import { attribute, hasClass, triggerable } from 'ember-cli-page-object';

export default {
  scope: '.task__user__users-list-item',

  assigned: hasClass('task__user__users-list-item--assigned'),
  selected: hasClass('selected'),

  mouseDown: triggerable('mousedown'),
  mouseEnter: triggerable('mouseenter'),

  image: {
    scope: 'img',
    src: attribute('src')
  },

  name: {
    scope: '.task__user__users-list-item__name'
  },

  username: {
    scope: '.task__user__users-list-item__username'
  }
};
