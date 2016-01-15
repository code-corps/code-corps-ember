import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  classNames: ['project-post-list'],

  didInitAttrs() {
    this.setProperties({
      pageNumber: 1,
      postType: null
    });
  },


  filteredPosts: Ember.computed('project', 'pageNumber', 'postType', function() {
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

  pages: Ember.computed('pageNumber', function() {
    let currentPage = this.get('pageNumber');

    // creates an array of length 5, ranging
    // from currentPage - 2 to currentPage + 2
    let pages = new Ember.A();
    for (let i = -2; i <= 2; i++) {
      pages.push(i + currentPage);
    }
    return pages;
  }),

  actions: {
    filterBy(postType) {
      this.set('postType', postType);
    },

    setPage(pageNumber) {
      this.set('pageNumber', pageNumber);
    },

    nextPage() {
      let currentPage = this.get('pageNumber');
      this.set('pageNumber', currentPage + 1);
    },

    previousPage() {
      let currentPage = this.get('pageNumber');
      this.set('pageNumber', currentPage - 1);
    }
  }
});
