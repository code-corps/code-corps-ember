import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: Ember.inject.service(),
  store: Ember.inject.service(),

  user: Ember.computed.alias('currentUser.user'),

  currentOrganization: null,

  currentOrganizationMemberships: Ember.computed.alias('currentOrganization.organizationMemberships'),

  currentUserMembership: Ember.computed('currentOrganizationMemberships.isLoaded', 'user', function() {
    let memberships = this.get('currentOrganizationMemberships');
    let membership = memberships.find((item) => this.findMembership(item));
    return membership;
  }),

  currentUserMembershipPromise: Ember.computed('currentOrganizationMemberships', 'user', function() {
    let memberships = this.get('currentOrganizationMemberships');
    let fulfilled = this.get('currentOrganizationMemberships.isFulfilled');

    if (fulfilled) {
      let membership = memberships.find((item) => this.findMembership(item));
      return Ember.RSVP.resolve(membership);
    } else {
      return memberships.then((memberships) => {
        let membership = memberships.find((item) => this.findMembership(item));
        return membership;
      });
    }
  }),

  findMembership: function(item) {
    let itemMemberId = item.belongsTo('member').id();
    let itemOrganizationId = item.belongsTo('organization').id();
    let currentUserId = this.get('user.id');
    let organizationId = this.get('currentOrganization.id');
    return (itemMemberId === currentUserId) && (itemOrganizationId === organizationId);
  },

  setOrganization(organization) {
    this.set('currentOrganization', organization);
    return this.get('currentOrganizationMemberships').reload();
  },

  userIsMemberInOrganization: Ember.computed.notEmpty('currentUserMembership'),
  userCanJoinOrganization: Ember.computed.empty('currentUserMembership'),

  userCanManageOrganization: Ember.computed.alias('currentUserMembership.isAtLeastAdmin'),
  userMembershipIsPending: Ember.computed.alias('currentUserMembership.isPending'),
});
