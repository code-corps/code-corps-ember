import Ember from 'ember';

const {
  computed,
} = Ember;

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
export default Ember.Component.extend({
  classNames: ['task-status-badge'],

  status: computed.alias('task.status'),
});
