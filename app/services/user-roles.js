import Ember from 'ember';

const {
  computed,
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  store: service(),

  isEmpty: computed.empty('userRoles'),
  user: computed.alias('currentUser.user'),

  userRoles: computed('user.userRoles',
    'user.userRoles.@each.role',
    'user.userRoles.@each.user',
  function() {
    return this.get('user.userRoles');
  }),

  addRole(role) {
    let user = this.get('user');
    let userRole = this.get('store').createRecord('user-role', {
      user,
      role
    });
    return userRole.save();
  },

  findUserRole(role) {
    let userRoles = this.get('userRoles');
    let userRole = userRoles.find((item) => {
      let itemUserId = item.belongsTo('user').id();
      let itemRoleId = item.belongsTo('role').id();
      let userId = this.get('user.id');
      let roleId = role.get('id');
      return (itemUserId === userId) && (itemRoleId === roleId);
    });
    return userRole;
  },

  removeRole(role) {
    let userRole = this.findUserRole(role);
    return userRole.destroyRecord();
  }
});
