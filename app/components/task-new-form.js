import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

/**
  The task-new-form component is used for creating new tasks. It includes
  the title, editor and preview

  ## default usage

  ```handlebars
  {{task-new-form task=newTask saveTask='saveTaskMethod'}}
  ```

  @class task-new-form
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['task-new-form'],
  tagName: 'form',

  /**
    @property credentials
    @type Ember.Service
   */
  credentials: service(),

  /**
    Returns which placeholder message to use.

    @property placeholder
    @type String
   */
  placeholder: 'How can you describe the steps to complete the task so anyone can work on it?'
});
