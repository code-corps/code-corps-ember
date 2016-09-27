import Ember from 'ember';

/**
  `project-post-list` provides a list of posts within the project and allows 
  for filtering and pagination.

  ## Default usage
  ```handlebars
    {{project-post-list posts=posts project=project}}
  ```
  ## Adding post filtering
    These additional properties allow for filtering.
  ```handlebars
    {{project-post-list
      isFiltered=isFiltered
      isFilteringClosedPosts=isFilteringClosedPosts
      isFilteringOpenPosts=isFilteringOpenPosts
      filterByStatus="filterByStatus"
      filterByType="filterByType"
      pageNumber=page
      posts=model
      project=project
      removeTypeFilter="removeTypeFilter"
      selectedTypes=selectedTypes
    }}
  ```

  @class Component
  @module project-post-list
  @extends Ember.Component
 */

export default Ember.Component.extend({
  classNames: ['project-post-list'],

  /**
    @property store
    @type Ember.Service
   */
  store: Ember.inject.service(),

  /**
    Returns information to handle pagination in the `pager-control`

    @property meta
    @type Object
   */
  meta: Ember.computed.alias('posts.meta'),

  /**
    Returns information for the `pager-control` to handle pagination.

    @property options
    @type Object
   */
  options: Ember.computed('meta', function() {
    return this._normalizeMeta(this.get('meta'));
  }),

  actions: {

    /**
      Action that sends the selected type to be added to filtering.

      @method filterByType
     */
    filterByType(type) {
      this.sendAction('filterByType', type);
    },

    /**
      Action that sends the selected type to be removed from filtering.

      @method removeTypeFilter
     */
    removeTypeFilter(type) {
      this.sendAction('removeTypeFilter', type);
    },

    /**
      Action that sends the selected status for filtering.

      @method filterByStatus
     */
    filterByStatus(status) {
      this.sendAction('filterByStatus', status);
    },
  },

  _normalizeMeta(meta) {
    if (Ember.isPresent(meta)) {
      return {
        currentPage: parseInt(meta["current_page"], 10),
        pageSize: parseInt(meta["page_size"], 10),
        totalPages: parseInt(meta["total_pages"], 10),
        totalRecords: parseInt(meta["total_records"])
      };
    }
  },
});
