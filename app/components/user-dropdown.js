import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

/**
  `user-dropdown` is the dropdown used for navigation within the main site

  ```handlebars
  {{user-dropdown user=model}}
  ```

  @class user-dropdown
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['dropdown-menu', 'dropdown-menu--right'],
  /**
    @property session
    @type Ember.Service
   */
  session: service(),

  click() {
    this.sendAction();
  },

  actions: {
    /**
     Action to invalidate the user session

     @method invalidateSession
     */
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
