import {
  attribute,
  collection,
  isVisible
} from 'ember-cli-page-object';

export default {
  scope: '.project-list',

  isVisible: isVisible(),

  items: collection({
    itemScope: '.project-item',
    item: {
      href: attribute('href', 'a:eq(0)')
    }
  })
};
