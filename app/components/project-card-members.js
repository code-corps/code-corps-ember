import Ember from 'ember';

const VISIBLE_MEMBERS_COUNT = 8;

/**
  `project-card-members` displays the first 8 members of a project and some statistics,
  including total number of members and how many members are not shown on the card, if any.

  ## default usage

  ```handlebars
  {{project-card-members members=projectOrganizationMembers}}
  ```

  @class project-card-members
  @module Component
  @extends Ember.Component
*/

export default Ember.Component.extend({
  classNames: ['project-card-members'],
  tagName: 'ul',

  /**
    The number of members visible on the project card.

    @property visibleMembers
    @type Number
  */
  visibleMembers: Ember.computed('members', function() {
    return this.get('members').slice(0, VISIBLE_MEMBERS_COUNT);
  }),

  /**
    Total number of members of a project.

    @property totalMembersCount
    @type Number
  */
  totalMembersCount: Ember.computed.alias('members.length'),

  /**
    Total number of members not shown on the project card.

    @property hiddenMembersCount
    @type Number
  */
  hiddenMembersCount: Ember.computed('totalMembersCount', function() {
    return this.get('totalMembersCount') -  VISIBLE_MEMBERS_COUNT;
  }),

  /**
    Determines if there are any hidden members who are not shown on the card.

    @property hiddenMembersExist
    @type Boolean
  */
  hiddenMembersExist: Ember.computed('hiddenMembersCount', function() {
    return this.get('hiddenMembersCount') > 0;
  })
});
