import Component from '@ember/component';
import { computed, get, getProperties, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { isEqual } from '@ember/utils';
import { ability } from 'ember-can/computed';
import createTaskUserOptions from 'code-corps-ember/utils/create-task-user-options';
import { EKMixin as EmberKeyboardMixin, keyDown } from 'ember-keyboard';

const TRIGGER_CLASS = '.ember-power-select-trigger';

export default Component.extend(EmberKeyboardMixin, {
  classNames: ['task-assignment'],

  currentUser: service(),
  store: service(),
  taskAssignment: service(),

  isAssigning: false,
  canTriggerAssignment: null,
  deferredRendering: null,
  task: null,
  taskUser: null,
  users: null,

  // auto-assigns 'task' property from component as ability 'model'
  ability: ability('task'),
  canAssign: alias('ability.canAssign'),
  currentUserId: alias('currentUser.user.id'),
  taskUserId: alias('taskUser.id'),

  assignedToSelf: computed('currentUserId', 'taskUser.id', function() {
    return isEqual(get(this, 'taskUser.id'), get(this, 'currentUserId'));
  }),

  init() {
    this._super(...arguments);

    set(this, 'keyboardActivated', true);
  },

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

    return users
      ? createTaskUserOptions(users, currentUserId, taskUserId)
      : [];
  }),

  changeUser(user) {
    let { task, taskAssignment }
      = getProperties(this, 'task', 'taskAssignment');

    return user
      ? taskAssignment.assign(task, user)
      : taskAssignment.unassign(task);
  },

  clickTrigger() {
    this
      .$('.ember-basic-dropdown-trigger')
      .get(0)
      .dispatchEvent(new MouseEvent('mousedown'));
  },

  selfAssign: on(keyDown('Space'), function(e) {
    let { canAssign, canTriggerAssignment, isAssigning }
      = getProperties(this, 'canAssign', 'canTriggerAssignment', 'isAssigning');
    if (canAssign && !isAssigning && canTriggerAssignment) {
      e.preventDefault();
      this.toggleSelfAssignment();
    }
  }),

  toggleSelfAssignment() {
    if (get(this, 'assignedToSelf')) {
      this.changeUser(); // unassign
    } else {
      let user = get(this, 'currentUser.user');
      this.changeUser(user); // self-assign
    }
  },

  triggerAssignment: on(keyDown('KeyA'), function(e) {
    let { canAssign, canTriggerAssignment, isAssigning }
      = getProperties(this, 'canAssign', 'canTriggerAssignment', 'isAssigning');
    if (canAssign && !isAssigning && canTriggerAssignment) {
      e.preventDefault();
      run(() => this.clickTrigger());
    }
  }),

  actions: {
    buildSelection(option, select) {
      return option === select.selected ? null : option;
    },

    changeUser(user) {
      this.changeUser(user);
    },

    closeDropdown() {
      set(this, 'isAssigning', false);
      this.sendAction('onclose');
      run.next(() => this.$(TRIGGER_CLASS).trigger('blur'));
    },

    openDropdown() {
      set(this, 'isAssigning', true);
      this.sendAction('onopen');
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
