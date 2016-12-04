import Ember from 'ember';

const {
  Component,
  computed,
  get,
  isPresent
} = Ember;

/**
  The `thank-you-container` component presents the main content for the
  `thank-you` donations page. This includes an icon, thank you message and
  a list of contributors.

  ## Default Usage

  ```handlebars
  {{thank-you-container project=project}}
  ```

  @class thank-you-container
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['thank-you-container'],

  /**
    A computed alias for the project's organization members

    @property organizationMemberships
    @type Ember.Array
   */
  organizationMemberships: computed.alias('project.organization.organizationMemberships'),

  /**
    Filters the array of `organizationMemberships` down to members who are not
    pending acceptance.

    @property nonPendingMemberships
    @type Ember.Array
   */
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

  /**
    Retuns a subset of at most 12 members from the `nonPendingMemberships` array.

    @property volunteers
    @type Ember.Array
   */
  volunteers: computed('nonPendingMemberships', function() {
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
