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
  classNames: ['page-menu', 'page-menu--horizontal', 'project__menu'],
  tagName: 'nav',

  /**
    Service that provides user authentication information.

    @property session
    @type Ember.Service
   */
  session: service(),

  projectHasPendingUsers: gt('projectPendingUsersCount', 0),
  projectPendingUsersCount: alias('projectPendingUsers.length'),
  projectPendingUsers: filterBy('project.projectUsers', 'role', 'pending')
});
