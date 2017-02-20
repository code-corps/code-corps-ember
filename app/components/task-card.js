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
  isEmpty
} = Ember;

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

  ability: EmberCan.computed.ability('task'),
  canAssign: alias('ability.canAssign'),
  canEdit: alias('ability.canEdit'),
  canReposition: alias('ability.canReposition'),

  currentUserId: alias('currentUser.user.id'),

  /**
   * For usage with data attribute bindings. Needs to be a function becaue it
   * needs to send 'true'/'false' strings.
   */
  'data-can-reposition': computed('canReposition', function() {
    let canReposition = get(this, 'canReposition');
    return canReposition ? 'true' : 'false';
  }),
  'data-model-id': alias('task.id'),
  'data-model-type': 'task',

  isLoading: alias('task.isLoading'),

  selectedOption: computed('taskUser', 'users', function() {
    let { taskUser, users } = getProperties(this, 'taskUser', 'users');
    if (isEmpty(taskUser) || isEmpty(users)) {
      return;
    }
    return users.find((item) => {
      return get(taskUser, 'id') === get(item, 'id');
    });
  }),

  taskSkills: mapBy('task.taskSkills', 'skill'),
  taskUserId: alias('taskUser.id'),
  users: alias('members'),

  /**
   * Computed property, builds and maintains the list used to render the
   * dropdown options on task assignment
   *
   * @property userOptions
   */
  userOptions: computed('currentUserId', 'taskUserId', 'users', function() {
    let { currentUserId, taskUserId, users }
      = getProperties(this, 'currentUserId', 'taskUserId', 'users');
    if (users) {
      // TODO: Replace content here!
      return createTaskUserOptions(users.mapBy('content'), currentUserId, taskUserId);
    } else {
      return [];
    }
  }),

  click(e) {
    // TODO: Find a better way to do this
    // Currently necessary due to the way that power select handles trigger
    let iconClassName = 'ember-power-select-status-icon';
    let triggerClassName = 'ember-power-select-trigger';
    if (e.target.className.includes(iconClassName) || e.target.className.includes(triggerClassName)) {
      return;
    }

    let { isLoading, task } = getProperties(this, 'isLoading', 'task');
    if (!isLoading) {
      this.sendAction('clickedTask', task);
    }
  },

  actions: {
    searchUsers(query) {
      let { currentUserId, store, taskUserId }
        = getProperties(this, 'currentUserId', 'store', 'taskUserId');
      return store.query('user', { query }).then((users) => {
        return createTaskUserOptions(users.toArray(), currentUserId, taskUserId);
      });
    },

    async selectUser(user) {
      let { task, taskAssignment } = getProperties(this, 'task', 'taskAssignment');

      let taskIsAssignedToUser = await taskAssignment.isAssignedTo(task, user);

      if (taskIsAssignedToUser) {
        return taskAssignment.unassign(task);
      } else {
        return taskAssignment.assign(task, user);
      }
    },

    stopClickPropagation(e) {
      e.stopPropagation();
    }
  }
});
