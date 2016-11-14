import { collection } from 'ember-cli-page-object';
import cardItem from './card-item';

export default {
  scope: '.card-list',

  cards: collection({
    itemScope: '.card-item',
    item: cardItem
  })
};
