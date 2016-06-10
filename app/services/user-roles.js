import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: Ember.inject.service(),
  store: Ember.inject.service(),

  isEmpty: Ember.computed.empty('userRoles'),
  user: Ember.computed.alias('currentUser.user'),

  userRoles: Ember.computed('user.userRoles',
    'user.userRoles.@each.role',
    'user.userRoles.@each.user',
  function() {
    return this.get('user.userRoles');
  }),

  addRole(role) {
    let user = this.get('user');
    let userRole = this.get('store').createRecord('user-role', {
      user: user,
      role: role
    });
    return userRole.save();
  },

  findUserRole: function(role) {
    let userRoles = this.get('userRoles');
    let userRole = userRoles.find(function(item) {
      let itemUserId = item.belongsTo('user').id();
      let itemRoleId = item.belongsTo('role').id();
      let userId = this.get('user.id');
      let roleId = role.get('id');
      return (itemUserId === userId) && (itemRoleId === roleId);
    }.bind(this));
    return userRole;
  },

  removeRole(role) {
    let userRole = this.findUserRole(role);
    return userRole.destroyRecord();
  },
});
