import Ember from 'ember';

const {
  Component,
  computed,
  get,
  isPresent
} = Ember;

export default Component.extend({
  classNames: ['thank-you-container'],

  organizationMemberships: computed.alias('project.organization.organizationMemberships'),
  nonPendingMemberships: computed('organizationMemberships.[]', 'organizationMemberships.@each.role', function() {
    let memberships = get(this, 'organizationMemberships');

    if (isPresent(memberships)) {
      return memberships.filter((membership) => {
        let isPending = get(membership, 'isPending');
        let role = get(membership, 'role');

        return isPresent(role) && !isPending;
      });
    }

    return [];
  }),

  contributors: computed('nonPendingMemberships', function() {
    let nonPendingMemberships = get(this, 'nonPendingMemberships');

    if (isPresent(nonPendingMemberships)) {
      let volunteers = nonPendingMemberships.map((orgMembership) => {
        return get(orgMembership, 'member');
      });

      if (volunteers.length > 12) {
        volunteers = this.randomSubset(volunteers, 12);
      }

      return volunteers;
    }

    return [];
  }),

  /*
   * Source: http://stackoverflow.com/a/11935263/1787262
   * Username: Tim Down
   * Date: December 3rd, 2016
   */
  randomSubset(arr, size) {
    let shuffled = arr.slice(0);
    let i = arr.length;
    let temp, index;

    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }

    return shuffled.slice(0, size);
  }
});
