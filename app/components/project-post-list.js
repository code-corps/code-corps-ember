import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  classNames: ['project-post-list'],

  didInitAttrs() {
    this.setProperties({
      pageNumber: 1,
      postType: null
    });
    this.send('reloadPosts');
  },

  reloadPosts() {
    let filterParams = {};
    filterParams.projectId = this.get('project.id');
    filterParams.page = this.get('pageParams');

    let postType = this.get('postType');
    if (Ember.isPresent(postType)) {
      filterParams.postType = postType;
    }

    this.get('store').query('post', filterParams).then((posts) => {
      this.setProperties({
        filteredPosts: posts,
        options: this._normalizeMeta(posts.get('meta'))
      });
    });
  },

  pageParams: Ember.computed('pageNumber', function() {
    return { number: this.get('pageNumber') };
  }),

  _normalizeMeta(meta) {
    return {
      currentPage: meta.current_page,
      pageSize: meta.page_size,
      totalPages: meta.total_pages,
      totalRecords: meta.total_records
    };
  },

  actions: {
    filterBy(postType) {
      this.setProperties({ postType: postType, pageNumber: 1 });
      this.send('reloadPosts');
    },

    pageChanged(pageNumber) {
      this.set('pageNumber', pageNumber);
      this.send('reloadPosts');
    },

    reloadPosts() {
      this.reloadPosts();
    }
  }
});
