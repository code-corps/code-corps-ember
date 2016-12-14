import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias },
  get
} = Ember;

export default Component.extend({
  attributeBindings: ['data-model-id', 'data-model-type'],
  classNames: ['task-card'],
  classNameBindings: ['taskTypeClass'],
  tagName: 'div',

  'data-model-id': alias('task.id'),
  'data-model-type': 'task',

  taskTypeClass: computed('taskType', function() {
    return `task-card--${get(this, 'taskType')}`;
  }),
  taskType: alias('task.taskType'),

  drop() {
    console.log('hello');
  }
});
