import { triggerable } from 'ember-cli-page-object';
import tooltip from 'code-corps-ember/tests/pages/helpers/tooltip';

export default {
  scope: '.select-inline__unselected-item',

  loadingIcon: {
    scope: '[data-test-loading-icon]'
  },

  mouseenter: triggerable('mouseenter'),
  mouseleave: triggerable('mouseleave'),

  tooltip
};
