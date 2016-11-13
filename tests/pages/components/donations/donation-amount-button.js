import { clickable, hasClass, isVisible } from 'ember-cli-page-object';

export default {
  scope: '.preset-amount',

  isRendered: isVisible(''),
  isActive: hasClass('default', ''),
  isInactive: hasClass('clear', ''),

  clickButton: clickable('')
};
