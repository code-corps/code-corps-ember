import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-post-list'],

  store: Ember.inject.service(),

  meta: Ember.computed.alias('posts.meta'),

  options: Ember.computed('meta', function() {
    return this._normalizeMeta(this.get('meta'));
  }),

  actions: {
    filterByType(type) {
      this.sendAction('filterByType', type);
    },

    removeTypeFilter(type) {
      this.sendAction('removeTypeFilter', type);
    },

    filterByStatus(status) {
      this.sendAction('filterByStatus', status);
    },

    removeStatusFilter(status) {
      this.sendAction('removeStatusFilter', status);
    }
  },

  _normalizeMeta(meta) {
    if (Ember.isPresent(meta)) {
      return {
        currentPage: parseInt(meta.current_page, 10),
        pageSize: parseInt(meta.page_size, 10),
        totalPages: parseInt(meta.total_pages, 10),
        totalRecords: parseInt(meta.total_records)
      };
    }
  },
});
