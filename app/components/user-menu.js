import Ember from 'ember';

/**
  The user-menu component is used to show/hide the user-dropdown menu

  ## default usage

  ```handlebars
    {{user-menu user=current}}
  ```

  @module Component
  @class user-menu
  @extends Ember.Component
  @public
 */
export default Ember.Component.extend({
  classNames: ['user-menu', 'dropdown'],
  classNameBindings: ['hidden:menu-hidden:menu-visible'],
  hidden: true,

  actions: {
    /**
     * Action that sets the hidden attribute to true
     *
     * @method hide
     */
    hide: function() {
      // Don't try to hide a destroyed menu component
      if(this.get('isDestroyed')) {
        return;
      }
      this.set('hidden', true);
    },

    /**
     * Action that toggles the hidden property
     *
     * @method toggle
     */
    toggle: function() {
      this.toggleProperty('hidden');
    },
  }
});
