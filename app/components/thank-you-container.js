import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

const MAX_VOLUNTEERS = 12;

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
    A computed alias for the project's approved memberships

    @property approvedMemberships
    @type Ember.Array
   */
  approvedMemberships: computed.alias('project.organization.approvedMemberships'),

  /**
    A computed array of approved members

    @property approvedMembers
    @type Ember.Array
   */
  approvedMembers: computed.mapBy('approvedMemberships', 'member'),

  /**
    Retuns a subset of at most `MAX_VOLUNTEERS` members from the `approvedMembers` array.

    @property volunteers
    @type Ember.Array
   */
  volunteers: computed('approvedMembers', function() {
    let approvedMembers = get(this, 'approvedMembers');

    if (approvedMembers.length > MAX_VOLUNTEERS) {
      approvedMembers = this.randomSubset(approvedMembers, MAX_VOLUNTEERS);
    }

    return approvedMembers;
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
