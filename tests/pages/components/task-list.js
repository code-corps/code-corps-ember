import {
  collection,
  text
} from 'ember-cli-page-object';
import taskCard from './task-card';

export default {
  title: text('[data-test-selector="task-list name"]'),

  taskCards: collection({
    itemScope: '.task-card',
    item: taskCard
  })
};
