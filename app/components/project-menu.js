import Ember from 'ember';

const {
  Component,
  computed: { alias, gt, filterBy },
  inject: { service }
} = Ember;

/**
  `project-menu` allows navigation within project functions. Users who
  manage an organization can also view contributors and project settings through
  additional menu items.

  ## Default usage
  ```Handlebars
    {{project-menu project=model}}
  ```

  @module Component
  @extends Ember.Component
  @class project-menu
 */
export default Component.extend({
  classNames: ['project__menu', 'project__menu--horizontal'],
  tagName: 'nav',

  /**
    Service that provides user authentication information.

    @property session
    @type Ember.Service
   */
  session: service(),

  projectHasPendingMembers: gt('projectPendingMembersCount', 0),
  projectPendingMembersCount: alias('projectPendingMemberships.length'),
  projectPendingMemberships: filterBy('project.projectUsers', 'role', 'pending')
});
