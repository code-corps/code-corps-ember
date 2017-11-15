import { triggerable, hasClass } from 'ember-cli-page-object';
import tooltip from 'code-corps-ember/tests/pages/helpers/tooltip';

export default{

  scope: '.unselected-item',

  isTooltipTarget: hasClass('ember-tooltip-or-popover-target'),

  mouseenter: triggerable('mouseenter'),
  mouseleave: triggerable('mouseleave'),

  unselectedIcon: 'data-test-unselected-icon',

  tooltip

};
