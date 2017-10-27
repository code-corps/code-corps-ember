import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { get, computed } from '@ember/object';

const VISIBLE_USERS_COUNT = 8;

/**
  `project-card/project-users` displays the first 8 contributors to a project
  and some statistics, including total number of contributors and how many
  contributors are not shown on the card, if any.

  ## default usage

  ```handlebars
  {{project-card/project-users projectUsers=projectUsers}}
  ```

  @class project-card/project-users
  @module Component
  @extends Ember.Component
*/

export default Component.extend({
  classNames: ['project-card__project-users'],
  tagName: 'ul',

  /**
    The number of users visible on the project card.

    @property visibleUsers
    @type Number
  */
  visibleUsers: computed('projectUsers', function() {
    return get(this, 'projectUsers').slice(0, VISIBLE_USERS_COUNT);
  }),

  /**
    Total number of contributors to a project.

    @property usersCount
    @type Number
  */
  usersCount: alias('projectUsers.length'),

  /**
    Total number of users not shown on the project card.

    @property hiddenUsersCount
    @type Number
  */
  hiddenUsersCount: computed('usersCount', function() {
    return get(this, 'usersCount') -  VISIBLE_USERS_COUNT;
  }),

  /**
    Determines if there are any hidden users who are not shown on the card.

    @property hiddenUsersExist
    @type Boolean
  */
  hiddenUsersExist: computed('hiddenUsersCount', function() {
    return get(this, 'hiddenUsersCount') > 0;
  })
});
