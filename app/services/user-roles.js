import Ember from 'ember';

const {
  computed,
  get,
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
    return get(this, 'user.userRoles');
  }),

  addRole(role) {
    let user = get(this, 'user');
    let userRole = get(this, 'store').createRecord('user-role', {
      user,
      role
    });
    return userRole.save();
  },

  findUserRole(role) {
    let userRoles = get(this, 'userRoles');
    let userRole = userRoles.find((item) => {
      let itemUserId = item.belongsTo('user').id();
      let itemRoleId = item.belongsTo('role').id();
      let userId = get(this, 'user.id');
      let roleId = get(role, 'id');
      return (itemUserId === userId) && (itemRoleId === roleId);
    });
    return userRole;
  },

  removeRole(role) {
    let userRole = this.findUserRole(role);
    return userRole.destroyRecord();
  }
});
