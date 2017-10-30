import Component from '@ember/component';
import { alias } from '@ember/object/computed';

/**
  A badge that presents a task's status

  ## default usage

  ```handlebars
  {{task-status task=task}}
  ```

  @class task-status
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['task-status-badge'],

  status: alias('task.status')
});
