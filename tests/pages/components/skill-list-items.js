import { collection, count } from 'ember-cli-page-object';
import skillListItem from './skill-list-item';

export default {
  scope: 'ul.skills',

  listItemCount: count('li'),

  listItems: collection({
    itemScope: 'li',
    item: skillListItem
  })
};
