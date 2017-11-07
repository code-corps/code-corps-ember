import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['task-list-cards'],

  orderedTasks: alias('taskList.orderedTasks')
});