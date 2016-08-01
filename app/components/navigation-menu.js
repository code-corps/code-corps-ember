import Ember from 'ember';

const { service } = Ember.inject;

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
export default Ember.Component.extend({
  classNames: ['menu', 'container'],

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
  session: service(),
});
