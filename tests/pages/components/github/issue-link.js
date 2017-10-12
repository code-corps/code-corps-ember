import { hasClass, triggerable } from 'ember-cli-page-object';
import tooltip from 'code-corps-ember/tests/pages/helpers/tooltip';

export default {
  scope: '.github__issue-link',

  issueNumber: {
    scope: '[data-test-issue-number]'
  },

  isTooltipTarget: hasClass('ember-tooltip-or-popover-target'),

  mouseenter: triggerable('mouseenter'),

  repoName: {
    scope: '[data-test-repo-name]'
  },

  tooltip,

  url: {
    scope: '[data-test-issue-url]'
  }
};