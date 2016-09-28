import Ember from 'ember';

/**
  The task-comment-list component composes the list of comments for a task.

  ## default usage

  ```handlebars
  {{task-comment-list comments=comments}}
  ```

  @class task-comment-list
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['task-comment-list']
});
