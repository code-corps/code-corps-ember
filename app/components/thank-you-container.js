import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  classNames: ['thank-you-container'],

  organizationMemberships: computed.alias('project.organization.organizationMemberships'),
  nonPendingMemberships: computed.filter('organizationMemberships', function(membership) {
    return !get(membership, 'isPending');
  }),

  contributors: computed('nonPendingMemberships.@each.member', function() {
    let organizationMemberships = get(this, 'organizationMemberships');
    let volunteers = organizationMemberships.map((orgMembership) => {
      return get(orgMembership, 'member');
    });

    return volunteers;
  })
});
