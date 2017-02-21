import { attribute, hasClass, notHasClass, triggerable } from 'ember-cli-page-object';
import tooltip from 'code-corps-ember/tests/pages/helpers/tooltip';

export default {
  scope: '.project-category-item',

  isTooltipTarget: hasClass('ember-tooltip-or-popover-target'),

  linkIcon: {
    scope: 'a',
    selected: hasClass('selected'),
    unselected: notHasClass('selected'),
    cssClass: attribute('class'),
    hasClass(klass) {
      return this.cssClass.indexOf(klass) > -1;
    }
  },

  mouseenter: triggerable('mouseenter'),

  tooltip
};
