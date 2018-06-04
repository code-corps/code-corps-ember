import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { get } from '@ember/object';
import { ability } from 'ember-can/computed';

export default Component.extend({
  classNames: ['archive-task'],

  // auto-assigns 'task' property from component as ability 'model'
  ability: ability('task'),
  canArchive: alias('ability.canArchive'),

  actions: {
    archiveTask() {
      if (window.confirm(`Are you sure you want to archive this task? Archiving this task will remove it from your ${get(this, 'task.taskList.title')} task list.`)) {
        get(this, 'archiveTask')();
      }
    }
  }
});
