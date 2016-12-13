import Ember from 'ember';
import EmberDragulaContainer from 'ember-dragula/components/ember-dragula-container';

const {
  computed: { alias, sort }
} = Ember;

export default EmberDragulaContainer.extend({
  attributeBindings: ['data-model-id', 'data-model-type'],
  classNames: ['task-list'],
  sorting: ['order:asc'],

  orderedTasks: sort('taskList.tasks', 'sorting'),

  'data-model-id': alias('taskList.id'),
  'data-model-type': 'task-list'
});
