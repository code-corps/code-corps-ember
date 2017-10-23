import EmberCan from 'ember-can';
import Ember from 'ember';
import createTaskUserOptions from 'code-corps-ember/utils/create-task-user-options';

const {
  Component,
  computed,
  computed: { alias, mapBy },
  get,
  getProperties,
  inject: { service },
  set
} = Ember;

const ICON_CLASS = 'ember-power-select-status-icon';
const TRIGGER_CLASS = 'ember-power-select-trigger';

export default Component.extend({
  attributeBindings: ['data-can-reposition', 'data-model-id', 'data-model-type'],
  classNames: ['task-card'],
  classNameBindings: ['canReposition:task-card--can-reposition', 'isLoading:task-card--is-loading'],
  tagName: 'div',

  currentUser: service(),
  session: service(),
  store: service(),
  taskAssignment: service(),

  bound: false,
  shouldShowUsers: false,

  // auto-assigns 'task' property from component as ability 'model'
  ability: EmberCan.computed.ability('task'),
  canAssign: alias('ability.canAssign'),
  canEdit: alias('ability.canEdit'),
  canReposition: alias('ability.canReposition'),

  currentUserId: alias('currentUser.user.id'),

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

  isLoading: alias('task.isLoading'),
  taskSkills: mapBy('task.taskSkills', 'skill'),
  taskUserId: alias('taskUser.id'),

  // TODO: this updates selection when it changes. However, it updates while
  // the change is still processing, and rolls back if it fails.
  // We should somehow skip the update if the change is processing
  // TODO: It also fails to roll back when reassignment fails
  didReceiveAttrs() {
    let { taskUserId, users } = getProperties(this, 'taskUserId', 'users');
    if (users) {
      set(this, 'selectedOption', users.findBy('id', taskUserId));
    }
  },

  /**
    Computed property, builds and maintains the list used to render the
    dropdown options on task assignment

    @property userOptions
  */
  userOptions: computed('currentUserId', 'taskUserId', 'users', function() {
    let { currentUserId, taskUserId, users }
      = getProperties(this, 'currentUserId', 'taskUserId', 'users');
    if (users) {
      return createTaskUserOptions(users, currentUserId, taskUserId);
    } else {
      return [];
    }
  }),

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

  actions: {
    buildSelection(option, select) {
      if (option === select.selected) {
        return null;
      }
      return option;
    },

    changeUser(user) {
      let { task, taskAssignment } = getProperties(this, 'task', 'taskAssignment');

      if (user) {
        return taskAssignment.assign(task, user);
      } else {
        return taskAssignment.unassign(task);
      }
    },

    searchUsers(query) {
      let { currentUserId, store, taskUserId }
        = getProperties(this, 'currentUserId', 'store', 'taskUserId');
      return store.query('user', { query }).then((users) => {
        return createTaskUserOptions(users.toArray(), currentUserId, taskUserId);
      });
    },

    stopClickPropagation(e) {
      e.stopPropagation();
    }
  }
});
