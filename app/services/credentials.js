import Ember from 'ember';

const {
  computed,
  inject: { service },
  RSVP,
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  store: service(),

  user: computed.alias('currentUser.user'),

  currentOrganization: null,

  currentOrganizationMemberships: computed.alias('currentOrganization.organizationMemberships'),

  currentUserMembership: computed('currentOrganizationMemberships.isLoaded', 'user', function() {
    let memberships = this.get('currentOrganizationMemberships');
    let membership = memberships.find((item) => this.findMembership(item));
    return membership;
  }),

  currentUserMembershipPromise: computed('currentOrganizationMemberships', 'user', function() {
    let memberships = this.get('currentOrganizationMemberships');
    let fulfilled = this.get('currentOrganizationMemberships.isFulfilled');

    if (fulfilled) {
      let membership = memberships.find((item) => this.findMembership(item));
      return RSVP.resolve(membership);
    } else {
      return memberships.then((memberships) => {
        let membership = memberships.find((item) => this.findMembership(item));
        return membership;
      });
    }
  }),

  findMembership(item) {
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

  userIsMemberInOrganization: computed.notEmpty('currentUserMembership'),
  userCanJoinOrganization: computed.empty('currentUserMembership'),

  userCanManageOrganization: computed.alias('currentUserMembership.isAtLeastAdmin'),
  userMembershipIsPending: computed.alias('currentUserMembership.isPending')
});
