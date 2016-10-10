import Ember from 'ember';

const { Component } = Ember;

/**
  The task-item component is used to present a task in the list of tasks.

  ## default usage

  ```handlebars
  {{task-item task=task}}
  ```

  @class task-item
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['task-item'],
  classNameBindings: ['task.taskType']
});
