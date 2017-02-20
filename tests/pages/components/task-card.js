import {
  hasClass
} from 'ember-cli-page-object';

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
  }
};
