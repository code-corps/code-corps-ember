import {
  attribute,
  hasClass
} from 'ember-cli-page-object';
import taskAssignment from 'code-corps-ember/tests/pages/components/power-select';

export default {
  scope: '.task-card',

  assignedUser: {
    scope: '.select-inline__selected-item',
    icon: {
      scope: 'img',
      url: attribute('src')
    }
  },

  canReposition: hasClass('task-card--can-reposition'),

  number: {
    scope: '[data-test-task-number]'
  },
  time: {
    scope: '[data-test-task-time]'
  },
  title: {
    scope: '[data-test-task-title]'
  },

  taskAssignment
};
