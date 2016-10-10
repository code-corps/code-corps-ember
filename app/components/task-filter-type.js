import Ember from 'ember';

const { Component } = Ember;

/**
  The task-filter-type component composes the selected filter and dropdown
  list of selectable filters. It takes in a list of selectable filter types
  (`selectedTypes`), and a `filterByType` action.

  ## default usage
  ```handlebars
  {{task-filter-type selectedTypes=filters filterByType="filterAction"}}
  ```

  @class task-filter-type
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['button-group', 'dropdown'],
  classNameBindings: ['active:menu-visible:menu-hidden'],

  /**
    Boolean that reflects whether or not the filter dropdown should be shown

    @property active
    @type Boolean
   */
  active: false,

  actions: {

    /**
      Action that sends an action to filter the corresponding list by
      given type.

      @method filterByType
      @param {String} type
     */
    filterByType(type) {
      this.sendAction('filterByType', type);
    },

    /**
      Action that hides the filter dropdown list.

      @method hide
     */
    hide() {
      this.set('active', false);
    },

    /**
      Action that toggles the `active` property, hiding/showing the filter
      dropdown list.

      @method toggle
     */
    toggle() {
      this.toggleProperty('active');
    }
  }
});
