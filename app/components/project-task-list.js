import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias },
  inject: { service },
  isPresent
} = Ember;

/**
  `project-task-list` provides a list of tasks within the project and allows
  for filtering and pagination.

  ## Default usage
  ```handlebars
    {{project-task-list tasks=tasks project=project}}
  ```
  ## Adding task filtering
    These additional properties allow for filtering.
  ```handlebars
    {{project-task-list
      isFiltered=isFiltered
      isFilteringClosedTasks=isFilteringClosedTasks
      isFilteringOpenTasks=isFilteringOpenTasks
      filterByStatus="filterByStatus"
      filterByType="filterByType"
      pageNumber=page
      tasks=model
      project=project
      removeTypeFilter="removeTypeFilter"
      selectedTypes=selectedTypes
    }}
  ```

  @class Component
  @module project-task-list
  @extends Ember.Component
 */

export default Component.extend({
  classNames: ['project-task-list'],

  /**
    @property store
    @type Ember.Service
   */
  store: service(),

  /**
    Returns information to handle pagination in the `pager-control`

    @property meta
    @type Object
   */
  meta: alias('tasks.meta'),

  /**
    Returns information for the `pager-control` to handle pagination.

    @property options
    @type Object
   */
  options: computed('meta', function() {
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
    }
  },

  _normalizeMeta(meta) {
    if (isPresent(meta)) {
      return {
        currentPage: parseInt(meta.current_page, 10),
        pageSize: parseInt(meta.page_size, 10),
        totalPages: parseInt(meta.total_pages, 10),
        totalRecords: parseInt(meta.total_records)
      };
    }
  }
});
