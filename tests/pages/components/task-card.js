import {
  hasClass
} from 'ember-cli-page-object';
import issueLink from 'code-corps-ember/tests/pages/components/github/issue-link';
import pullRequestIcon from 'code-corps-ember/tests/pages/components/github/pull-request-icon';
import taskAssignment from 'code-corps-ember/tests/pages/components/task-assignment';

export default {
  scope: '.task-card',

  canReposition: hasClass('task-card--can-reposition'),

  issueLink,

  number: {
    scope: '[data-test-task-number]'
  },

  pullRequestIcon,

  taskAssignment,

  time: {
    scope: '[data-test-task-time]'
  },

  title: {
    scope: '[data-test-task-title]'
  }
};
