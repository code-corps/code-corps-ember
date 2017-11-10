import Component from '@ember/component';
import { mapBy, alias } from '@ember/object/computed';
import { computed, get, getProperties, set } from '@ember/object';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import EmberCan from 'ember-can';
import { EKMixin as EmberKeyboardMixin, keyDown } from 'ember-keyboard';
import { task as concurrentTask } from 'ember-concurrency';

const ICON_CLASS = 'ember-power-select-status-icon';
const TRIGGER_CLASS = 'ember-power-select-trigger';

export default Component.extend(EmberKeyboardMixin, {
  attributeBindings: ['data-can-reposition', 'data-model-id', 'data-model-type'],
  classNames: ['task-card'],
  classNameBindings: ['canReposition:task-card--can-reposition', 'isLoading:task-card--is-loading'],
  tagName: 'div',

  session: service(),
  store: service(),

  bound: false,
  hovering: false,
  shouldShowUsers: false,
  task: null,
  taskUser: null,
  users: null,

  // auto-assigns 'task' property from component as ability 'model'
  ability: EmberCan.computed.ability('task'),
  canArchive: alias('ability.canArchive'),
  canReposition: alias('ability.canReposition'),
  isLoading: alias('task.isLoading'),
  taskSkills: mapBy('task.taskSkills', 'skill'),

  init() {
    this._super(...arguments);
  },

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

  archiveTask: concurrentTask(function* () {
    let task = get(this, 'task');
    set(task, 'archived', true);
    let next = this.$().next(); // get the next sibling
    yield task.save().then(() => {
      // trigger a mouseenter since the mouse doesn't update without the user
      if (next) {
        next.trigger('mouseenter');
      }
    });
  }).drop(),

  willDestroyElement(...args) {
    this._super(...args);
    this.$().trigger('mouseleave');
  },

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
  },

  mouseEnter() {
    set(this, 'hovering', true);
    set(this, 'keyboardActivated', true);
  },

  mouseLeave() {
    set(this, 'hovering', false);
    set(this, 'keyboardActivated', false);
  },

  triggerArchive: on(keyDown('KeyC'), function() {
    let hovering = get(this, 'hovering');
    let canArchive = get(this, 'canArchive');
    if (hovering && canArchive) {
      get(this, 'archiveTask').perform();
    }
  })
});
