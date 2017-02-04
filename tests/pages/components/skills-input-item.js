import { collection, hasClass, triggerable } from 'ember-cli-page-object';

export default {
  scope: '.skill-dropdown-item',

  listItemIsSelected: hasClass('selected'),
  mouseenter: triggerable('mouseenter'),
  mousedown: triggerable('mousedown'),

  highlightedStrings: collection({
    itemScope: 'strong'
  })
};
