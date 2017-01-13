import EmberCan from 'ember-can';
import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias },
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  attributeBindings: ['data-can-reposition', 'data-model-id', 'data-model-type'],
  classNames: ['task-card'],
  classNameBindings: ['canReposition:task-card--can-reposition', 'isLoading:task-card--is-loading', 'taskTypeClass'],
  tagName: 'div',

  session: service(),

  trueValue: true,

  ability: EmberCan.computed.ability('task'),
  canReposition: alias('ability.canReposition'),

  'data-can-reposition': computed('canReposition', function() {
    let canReposition = get(this, 'canReposition');
    return canReposition ? 'true' : 'false';
  }),
  'data-model-id': alias('task.id'),
  'data-model-type': 'task',

  isLoading: alias('task.isLoading'),

  taskType: alias('task.taskType'),
  taskTypeClass: computed('taskType', function() {
    return `task-card--${get(this, 'taskType')}`;
  }),

  click() {
    let isLoading = get(this, 'isLoading');
    let task = get(this, 'task');
    if (!isLoading) {
      this.sendAction('clickedTask', task);
    }
  }
});
