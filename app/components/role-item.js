import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { set, getProperties, get, computed } from '@ember/object';

export default Component.extend({
  classNames: ['role-item'],
  classNameBindings: ['selected'],
  isLoading: false,

  flashMessages: service(),
  userRoles: service(),

  selected: notEmpty('userRole'),

  userRole: computed('role', 'userRoles.userRoles', function() {
    let { role, userRoles } = getProperties(this, 'role', 'userRoles');
    return userRoles.findUserRole(role);
  }),

  actions: {
    addRole(role) {
      set(this, 'isLoading', true);
      let userRoles = get(this, 'userRoles');
      return userRoles.addRole(role).catch(() => {
        let message = `An error occurred trying to add ${get(role, 'name')}.`;
        this._flashError(message);
      }).finally(() => {
        set(this, 'isLoading', false);
      });
    },

    removeRole(role) {
      set(this, 'isLoading', true);
      let userRoles = get(this, 'userRoles');
      return userRoles.removeRole(role).catch(() => {
        let message = `An error occurred trying to remove ${get(role, 'name')}.`;
        this._flashError(message);
      }).finally(() => {
        set(this, 'isLoading', false);
      });
    }
  },

  _flashError(message) {
    let options = { fixed: true, sticky: false, timeout: 5000 };
    get(this, 'flashMessages').clearMessages().danger(message, options);
  }
});
