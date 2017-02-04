import { isVisible } from 'ember-cli-page-object';
import skillListItemLink from './skill-list-item-link';

export default {
  scope: 'li.skill-list-item',

  skillListItemLink,

  rendersLogin: isVisible('a[href$=login]')
};
