import Ember from 'ember';

const {
  computed,
  computed: {
    alias, empty, notEmpty
  },
  get,
  inject: { service },
  RSVP,
  Service,
  set
} = Ember;

export default Service.extend({
  organization: null,

  currentUser: service(),
  store: service(),

  membership: computed('memberships', 'user', {
    get() {
      get(this, 'membershipPromise').then((membership) => {
        set(this, 'membership', membership);
      });
      return null;
    },
    set(k, val) {
      return val;
    }
  }),

  // Memberships may not be loaded, so we need to wait for them to resolve
  // Can be useful in routing when we need it loaded to prevent a transition
  membershipPromise: computed('memberships', 'user', function() {
    let memberships = get(this, 'memberships');
    let fulfilled = get(this, 'memberships.isFulfilled');
    if (fulfilled) {
      let membership = memberships.find((membership) => this._findMembership(membership));
      return RSVP.resolve(membership);
    } else {
      return memberships.then((memberships) => {
        return memberships.find((membership) => this._findMembership(membership));
      });
    }
  }),

  memberships: alias('organization.organizationMemberships'),

  user: alias('currentUser.user'),
  userCanJoinOrganization: empty('membership'),
  userCanManageOrganization: alias('membership.isAtLeastAdmin'),
  userIsMemberInOrganization: notEmpty('membership'),
  userMembershipIsPending: alias('membership.isPending'),

  joinOrganization() {
    let member = get(this, 'user');
    let membership = get(this, 'memberships').createRecord({
      member,
      role: 'pending'
    });
    return membership.save();
  },

  setOrganization(organization) {
    set(this, 'organization', organization);
    return this._refresh();
  },

  _findMembership(membership) {
    let membershipUserId = membership.belongsTo('member').id();
    let membershipOrganizationId = membership.belongsTo('organization').id();
    let userId = get(this, 'user.id');
    let organizationId = get(this, 'organization.id');
    return (membershipUserId === userId) && (membershipOrganizationId === organizationId);
  },

  _refresh() {
    return get(this, 'memberships').reload();
  }
});
