import {
  attribute,
  collection
} from 'ember-cli-page-object';

export default {
  scope: '.project-task-list',

  issues: collection({
    scope: '.task-item.issue'
  }),

  taskItems: collection({
    scope: '.task-item',
    itemScope: 'a',
    item: {
      href: attribute('href')
    }
  }),

  tasks: collection({
    scope: '.task-item.task'
  })
};
