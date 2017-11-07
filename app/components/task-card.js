import Component from '@ember/component';
import { mapBy, alias } from '@ember/object/computed';
import { getProperties, get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import EmberCan from 'ember-can';

const ICON_CLASS = 'ember-power-select-status-icon';
const TRIGGER_CLASS = 'ember-power-select-trigger';

export default Component.extend({
  attributeBindings: ['data-can-reposition', 'data-model-id', 'data-model-type'],
  classNames: ['task-card'],
  classNameBindings: ['canReposition:task-card--can-reposition', 'isLoading:task-card--is-loading'],
  tagName: 'div',

  session: service(),
  store: service(),

  bound: false,
  shouldShowUsers: false,
  task: null,
  taskUser: null,
  users: null,

  // auto-assigns 'task' property from component as ability 'model'
  ability: EmberCan.computed.ability('task'),
  canReposition: alias('ability.canReposition'),
  isLoading: alias('task.isLoading'),
  taskSkills: mapBy('task.taskSkills', 'skill'),

  /**
  For usage with data attribute bindings. Needs to be a function because it
  needs to send 'true' and 'false' strings.
  */
  'data-can-reposition': computed('canReposition', function() {
    let canReposition = get(this, 'canReposition');
    return canReposition ? 'true' : 'false';
  }),
  'data-model-id': alias('task.id'),
  'data-model-type': 'task',

  click(e) {
    if (e.target instanceof SVGElement) {
      return;
    }

    // TODO: Find a better way to do this
    // Currently necessary due to the way that power select handles trigger
    let clickedIcon = e.target.className.includes(ICON_CLASS);
    let clickedTrigger = e.target.className.includes(TRIGGER_CLASS);
    if (clickedIcon || clickedTrigger) {
      return;
    }

    let { isLoading, task } = getProperties(this, 'isLoading', 'task');
    if (!isLoading) {
      this.sendAction('clickedTask', task);
    }
  }
});
