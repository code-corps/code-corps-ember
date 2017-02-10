import Ember from 'ember';

const {
  Component,
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
    Retreives user credentials to show more content for project managers.

    @property credentials
    @type Ember.Service
   */
  credentials: service(),

  /**
    Service that provides user authentication information.

    @property session
    @type Ember.Service
   */
  session: service()
});
