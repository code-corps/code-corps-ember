import { attribute, triggerable } from 'ember-cli-page-object';
import tooltip from 'code-corps-ember/tests/pages/helpers/tooltip';

export default {
  scope: '.select-inline__selected-item',

  selectedIcon: {
    scope: '[data-test-selected-icon]',
    src: attribute('src')
  },

  mouseenter: triggerable('mouseenter'),
  mouseleave: triggerable('mouseleave'),

  tooltip
};
