import { triggerable, hasClass } from 'ember-cli-page-object';
import tooltip from 'code-corps-ember/tests/pages/helpers/tooltip';

export default {
  scope: '.select-inline__selected-item',

  selectedIcon: {
    icon: {
      imageSource: property('src', 'img'),
    }
  },

  mouseenter: triggerable('mouseenter'),
  mouseleave: triggerable('mouseleave'),

  tooltip
};
