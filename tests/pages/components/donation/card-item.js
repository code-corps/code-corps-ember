import { clickable, hasClass, text } from 'ember-cli-page-object';

export default {
  scope: '.card-item',

  cardDescription: text(''),
  clickCard: clickable(''),
  isSelected: hasClass('selected', '')
};
