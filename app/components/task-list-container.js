import { alias } from '@ember/object/computed';
import EmberDragulaContainer from 'ember-dragula/components/ember-dragula-container';

export default EmberDragulaContainer.extend({
  attributeBindings: ['data-model-id', 'data-model-type'],

  classNames: ['task-list-container'],

  'data-model-id': alias('taskList.id'),
  'data-model-type': 'task-list'
});

