import Ember from 'ember';

/**
  The post-filter-dropdown component composes the filter dropdown list that is
  used for selecting filters for the list of posts.

  ## default usage

  ```handlebars
  {{post-filter-dropdown field=filterField selectedFilters=listOfFilters
      hide="hideAction" filterBy="filterAction"}}
  ```

  @class post-filter-dropdown
  @module Component
  @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['dropdown-menu'],
  tagName: 'ul',

  /**
    Sends the `hide` action when a filter is clicked.

    @method click
   */
  click() {
    this.sendAction('hide');
  },

  actions: {

    /**
      Action that sends the `filterBy` action to it's parent with the selected
      filter.

      @method filterBy
      @param {String} filter
     */
    filterBy(filter) {
      this.sendAction('filterBy', filter);
    },

    /**
      Action that sends the `hide` action to it's parent to hide the dropdown
      list.

      @method hide
     */
    hide() {
      this.sendAction('hide');
    },
  }
});
