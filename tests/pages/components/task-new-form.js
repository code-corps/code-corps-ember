import {
  attribute,
  hasClass
} from 'ember-cli-page-object';

export default {

  markdown: {
    scope: '[name=markdown]',
    placeholder: attribute('placeholder')
  },

  saveButton: {
    scope: 'input[name=submit]',
    rendersAsIdea: hasClass('idea'),
    rendersAsIssue: hasClass('issue'),
    rendersAsTask: hasClass('task')
  },

  taskType: {
    scope: '[name=task-type]'
  },

  taskTypeWrapper: {
    scope: '.input-group.task-type',
    rendersAsIdea: hasClass('idea'),
    rendersAsIssue: hasClass('issue'),
    rendersAsTask: hasClass('task')
  },

  title: {
    scope: '[name=title]'
  }
};
