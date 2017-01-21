import {
  attribute,
  collection
} from 'ember-cli-page-object';

export default {
  scope: '.project-list',

  items: collection({
    itemScope: '.project-item',
    item: {
      href: attribute('href', 'a:eq(0)')
    }
  })
};
