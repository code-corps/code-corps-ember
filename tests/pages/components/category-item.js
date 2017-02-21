import { attribute, hasClass, notHasClass } from 'ember-cli-page-object';

export default {
  scope: '.category-item',

  button: {
    scope: 'button',
    spinning: hasClass('button-spinner', 'span'),
    notSpinning: notHasClass('button-spinner', 'span'),
    checked: hasClass('check-mark', 'span'),
    unchecked: hasClass('check-area', 'span')
  },

  description: {
    scope: 'p'
  },

  icon: {
    scope: '.category-item__icon',
    cssClass: attribute('class'),
    classContains(klass) {
      return this.cssClass.indexOf(klass) > -1;
    }
  },

  selected: hasClass('selected'),
  unselected: notHasClass('selected')
};
