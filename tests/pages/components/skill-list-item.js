import { hasClass, isVisible } from 'ember-cli-page-object';
import skillListItemLink from './skill-list-item-link';

export default {
  scope: 'li.skill-list-item',

  skillListItemLink,

  skillListItemSpan: {
    scope: 'span',

    hasMatched: hasClass('matched')
  },

  rendersLogin: isVisible('a[href$=login]')
};
