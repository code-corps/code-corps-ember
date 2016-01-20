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
    let filterParams = this.get('filterParams');

    this.get('store').query('post', filterParams).then((posts) => {
      this.setProperties({
        filteredPosts: posts,
        options: this._normalizeMeta(posts.get('meta'))
      });
    });
  },


  filterParams: Ember.computed('project.id', 'pageNumber', 'postType', function() {
    let filterParams = {
      projectId: this.get('project.id'),
      page: { number: this.get('pageNumber') }
    };

    let postType = this.get('postType');

    if (Ember.isPresent(postType)) {
      filterParams.postType = postType;
    }

    return filterParams;
  }),

  _normalizeMeta(meta) {
    return {
      currentPage: meta.current_page,
      pageSize: meta.page_size,
      totalPages: meta.total_pages,
      totalRecords: meta.total_records
    };
  },

  /*filteredPosts: Ember.computed('project', 'pageNumber', 'postType', function() {
    let filterParams = {
      projectId: this.get('project.id'),
      page: {
        number: this.get('pageNumber')
      }
    };

    let postType = this.get('postType');

    if (Ember.isPresent(postType)) {
      filterParams.postType = postType;
    }

    return this.get('store').query('post', filterParams);
  }),

  options: Ember.computed('filteredPosts', function() {
    return this.get('filteredPosts').then(function(posts) {
      let meta = posts.get('meta');
      return {
        currentPage: meta.current_page,
        pageSize: meta.page_size,
        totalPages: meta.total_pages,
        totalRecords: meta.total_records
      };
    });
  }),*/

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
