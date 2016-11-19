import Ember from 'ember';

const {
  computed,
  inject: { service },
  RSVP,
  Service
} = Ember;

export default Service.extend({
  organization: null,

  currentUser: service(),
  store: service(),

  memberships: computed.alias('organization.organizationMemberships'),

  membership: computed('memberships.@each.isNew', function() {
    let memberships = this.get('_loadedMemberships');
    if (memberships) {
      return memberships.find((membership) => this.findMembership(membership));
    }
  }),

  membershipPromise: computed('memberships', function() {
    let memberships = this.get('memberships');
    let fulfilled = this.get('memberships.isFulfilled');

    if (fulfilled) {
      let membership = memberships.find((membership) => this.findMembership(membership));
      return RSVP.resolve(membership);
    } else {
      return memberships.then((memberships) => {
        return memberships.find((membership) => this.findMembership(membership));
      });
    }
  }),

  user: computed.alias('currentUser.user'),
  userCanJoinOrganization: computed.empty('membership'),
  userCanManageOrganization: computed.alias('membership.isAtLeastAdmin'),
  userIsMemberInOrganization: computed.notEmpty('membership'),
  userMembershipIsPending: computed.alias('membership.isPending'),

  findMembership(membership) {
    let membershipUserId = membership.belongsTo('member').id();
    let membershipOrganizationId = membership.belongsTo('organization').id();
    let userId = this.get('user.id');
    let organizationId = this.get('organization.id');
    return (membershipUserId === userId) && (membershipOrganizationId === organizationId);
  },

  joinOrganization() {
    let member = this.get('user');
    let organization = this.get('organization');

    let membership = this.get('store').createRecord('organization-membership', {
      member,
      organization,
      role: 'pending'
    });

    return membership.save();
  },

  refresh() {
    return this.get('memberships').reload();
  },

  setOrganization(organization) {
    this.set('organization', organization);
    return this.refresh();
  },

  _loadedMemberships: computed.filterBy('memberships', 'isNew', false)
});
