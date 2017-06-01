import Ember from 'ember';

const {
  Component
} = Ember;

/**
  `settings-menu` allows navigation within a user's settings.

  ## Default usage
  ```Handlebars
    {{settings-menu}}
  ```

  @module Component
  @extends Ember.Component
  @class settings-menu
 */
export default Component.extend({
  classNames: ['page-menu', 'page-menu--horizontal', 'settings__menu'],
  tagName: 'nav'
});
