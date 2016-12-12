import {
  hasClass
} from 'ember-cli-page-object';

export default {
  scope: '.task-card',

  isIdea: hasClass('task-card--idea'),
  isIssue: hasClass('task-card--issue'),
  isTask: hasClass('task-card--task'),

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
