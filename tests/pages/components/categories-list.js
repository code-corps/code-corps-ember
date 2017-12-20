import {
  collection,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.start__interests',

  items: collection({
    itemScope: '.category-item',
    item: {
      name: text('button')
    }
  })
};
