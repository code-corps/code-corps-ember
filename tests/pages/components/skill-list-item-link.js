import { clickable, hasClass, triggerable } from 'ember-cli-page-object';
import tooltip from 'code-corps-ember/tests/pages/helpers/tooltip';

export default {
  scope: '.skill-list-item-link',

  skillTitle: {
    scope: 'span'
  },

  click: clickable(),
  mouseenter: triggerable('mouseenter'),
  mouseleave: triggerable('mouseleave'),

  hasJustClicked: hasClass('just-clicked'),
  hasJustRemoved: hasClass('just-removed'),
  hasMatched: hasClass('matched'),
  tooltip
};
