import Ember from 'ember';

const {
  computed,
  computed: { alias },
  get
} = Ember;

export default Ember.Component.extend({
  classNames: ['task-card'],
  classNameBindings: ['taskTypeClass'],
  tagName: 'div',

  taskTypeClass: computed('taskType', function() {
    return `task-card--${get(this, 'taskType')}`;
  }),
  taskType: alias('task.taskType')
});
