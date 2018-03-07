import {
  collection,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.start__interests',
  items: collection('.category-item', { name: text('button') })
};
