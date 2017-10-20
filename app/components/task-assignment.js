import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { set, getProperties, computed } from '@ember/object';
import EmberCan from 'ember-can';
import createTaskUserOptions from 'code-corps-ember/utils/create-task-user-options';

export default Component.extend({
  classNames: ['task-assignment'],

  currentUser: service(),
  taskAssignment: service(),

  task: null,
  taskUser: null,
  users: null,

  // auto-assigns 'task' property from component as ability 'model'
  ability: EmberCan.computed.ability('task'),
  canAssign: alias('ability.canAssign'),
  currentUserId: alias('currentUser.user.id'),
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
