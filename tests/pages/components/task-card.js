import { hasClass, triggerable } from 'ember-cli-page-object';
import issueLink from 'code-corps-ember/tests/pages/components/github/issue-link';
import pullRequestIcon from 'code-corps-ember/tests/pages/components/github/pull-request-icon';
import taskAssignment from 'code-corps-ember/tests/pages/components/task-assignment';
import { triggerKeyDown } from 'ember-keyboard';

export default {
  scope: '.task-card',

  canReposition: hasClass('task-card--can-reposition'),

  issueLink,

  mouseenter: triggerable('mouseenter'),
  mouseleave: triggerable('mouseleave'),

  number: {
    scope: '[data-test-task-number]'
  },

  pullRequestIcon,

  taskAssignment,

  triggerKeyDown,

  time: {
    scope: '[data-test-task-time]'
  },

  title: {
    scope: '[data-test-task-title]'
  }
};
