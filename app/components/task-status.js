import Ember from 'ember';

const {
  Component,
  computed: { alias }
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
export default Component.extend({
  classNames: ['task-status-badge'],

  status: alias('task.status')
});
