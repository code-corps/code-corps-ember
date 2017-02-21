import {
  hasClass
} from 'ember-cli-page-object';
import taskAssignment from 'code-corps-ember/tests/pages/components/power-select';

export default {
  scope: '.task-card',

  canReposition: hasClass('task-card--can-reposition'),

  number: {
    scope: '[data-test-selector="task number"]'
  },
  time: {
    scope: '[data-test-selector="task time"]'
  },
  title: {
    scope: '[data-test-selector="task title"]'
  },

  taskAssignment
};
