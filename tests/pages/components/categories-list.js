import {
  collection,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.categories-list',
  items: collection({
    itemScope: '.category-item',
    item: {
      name: text('')
    }
  })
};
