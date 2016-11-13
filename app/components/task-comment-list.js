import Ember from 'ember';

const { Component } = Ember;

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
export default Component.extend({
  classNames: ['task-comment-list']
});
