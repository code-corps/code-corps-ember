import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['role-item'],
  classNameBindings: ['selected'],
  isLoading: false,

  flashMessages: Ember.inject.service(),
  userRoles: Ember.inject.service(),

  selected: Ember.computed.notEmpty('userRole'),

  userRole: Ember.computed('role', 'userRoles.userRoles', function() {
    let role = this.get('role');
    let userRoles = this.get('userRoles');
    return userRoles.findUserRole(role);
  }),

  actions: {
    addRole(role) {
      this.set('isLoading', true);
      let userRoles = this.get('userRoles');
      return userRoles.addRole(role).catch(() => {
        let message = `An error occurred trying to add ${role.get('name')}.`;
        this._flashError(message);
      }).finally(() => {
        this.set('isLoading', false);
      });
    },

    removeRole(role) {
      this.set('isLoading', true);
      let userRoles = this.get('userRoles');
      return userRoles.removeRole(role).catch(() => {
        let message = `An error occurred trying to remove ${role.get('name')}.`;
        this._flashError(message);
      }).finally(() => {
        this.set('isLoading', false);
      });
    },
  },

  _flashError(message) {
    const flashMessages = Ember.get(this, 'flashMessages');
    flashMessages.clearMessages();
    return flashMessages.add({
      message: message,
      type: 'danger',
      fixed: true,
      sticky: false,
      timeout: 5000,
    });
  },
});
