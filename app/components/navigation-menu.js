import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

/**
  `navigation-menu` composes the top navigation-menu.

  ## default usage

  ```handlebars
  {{navigation-menu}}
  ```

  @class navigation-menu
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  tagName: 'header',
  classNames: ['site-header', 'container'],

  /**
    @property currentUser
    @type Ember.Service
   */
  currentUser: service(),

  /**
    @property navigationMenu
    @type Ember.Service
   */
  navigationMenu: service(),

  /**
    @property onboarding
    @type Ember.Service
   */
  onboarding: service(),

  /**
    @property session
    @type Ember.Service
   */
  session: service()
});
