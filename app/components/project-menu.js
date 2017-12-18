import Component from '@ember/component';
import { filterBy, gt, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

/**
  `project-menu` allows navigation within project functions.

  Users who manage the project can view additional menu items.

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
