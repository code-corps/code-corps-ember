import Ember from 'ember';

const {
  Component,
  computed: { equal }
} = Ember;

/**
  The task-status-button component is a button that is used for closing and
  re-opening tasks.

  @class task-status-button
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['task-status-button'],
  tagName: 'span',

  /**
    Computed property that checks if the task is open.

    @property isOpen
    @type Boolean
   */
  isOpen: equal('task.status', 'open'),

  actions: {

    /**
      Action that sets the tasks status to `closed` and saves the task.

      @method closeTask
     */
    closeTask() {
      let task = this.get('task');
      task.set('status', 'closed');
      return task.save();
    },

    /**
      Action that sets the tasks status to `open` and saves the task.

      @method reopenTask
     */
    reopenTask() {
      let task = this.get('task');
      task.set('status', 'open');
      return task.save();
    }
  }
});
