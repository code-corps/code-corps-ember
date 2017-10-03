import Ember from 'ember';

const {
  Component,
  computed,
  computed: { filter, mapBy },
  get,
  inject: { service }
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

  onboarding: service(),

  /**
    A filter for the project's approved users

    @property approvedProjectUsers
    @type Ember.Array
   */
  approvedProjectUsers: filter('project.projectUsers', function(projectUser) {
    return get(projectUser, 'role') !== 'pending';
  }),

  /**
    A computed array of approved project users

    @property approvedUsers
    @type Ember.Array
   */
  approvedUsers: mapBy('approvedProjectUsers', 'user'),

  /**
    Retuns a subset of at most `MAX_VOLUNTEERS` members from the `approvedUsers` array.

    @property volunteers
    @type Ember.Array
   */
  volunteers: computed('approvedUsers', function() {
    let approvedUsers = get(this, 'approvedUsers');

    if (approvedUsers.length > MAX_VOLUNTEERS) {
      approvedUsers = this.randomSubset(approvedUsers, MAX_VOLUNTEERS);
    }

    return approvedUsers;
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
