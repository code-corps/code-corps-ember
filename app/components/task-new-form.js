import Ember from 'ember';

/**
  The task-new-form component is used for creating new tasks. It includes the
  task type, title, editor and preview

  ## default usage

  ```handlebars
  {{task-new-form task=newTask saveTask='saveTaskMethod'}}
  ```

  @class task-new-form
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['task-new-form'],
  classNameBindings: ['task.taskType'],
  tagName: 'form',

  /**
    @property credentials
    @type Ember.Service
   */
  credentials: Ember.inject.service(),

  /**
    Holds the placeholder messages for each task type: task, issue, idea.

    @property placeholders
    @type Object
   */
  placeholders: {
    task: "How can you describe the steps to complete the task so anyone can work on it?",
    issue: "What issue needs resolved? If it's a bug, how can anyone reproduce it?",
    idea: "What's your idea? Be specific so people can give more accurate feedback.",
  },

  /**
    Returns which placeholder message to use from the placeholders property
    based on the task type.

    @property placeholder
    @type String
   */
  placeholder: Ember.computed('task.taskType', function() {
    let taskType = this.get('task.taskType');
    if (taskType) {
      return this.get(`placeholders.$(taskType)`);
    }
  }),

  actions: {

    /**
      Action that is fired on form submit. Sends the `saveTask` action that
      was passed into the component.

      @method submit
     */
    submit() {
      let task = this.get('task');
      this.sendAction('saveTask', task);
    },
  },
});
