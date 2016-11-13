import Ember from 'ember';

const { Component } = Ember;

/**
  `user-sidebar` is a sidebar on the user's profile

  ```handlebars
  {{user-sidebar user=model}}
  ```

  @class user-sidebar
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['user-sidebar']
});
