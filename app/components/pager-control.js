import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['pager-control'],

  pagesToShow: 5,

  currentPage: Ember.computed.alias('options.currentPage'),
  totalPages: Ember.computed.alias('options.totalPages'),
  totalRecords: Ember.computed.alias('options.totalRecords'),
  pageSize: Ember.computed.alias('options.pageSize'),

  centerPage: Ember.computed('currentPage', 'pagesToShow', function() {
    let currentPage = this.get('currentPage');
    let pagesToShow = this.get('pagesToShow');

    let minCenterPage = Math.ceil(pagesToShow / 2);
    return (currentPage >= minCenterPage) ? currentPage: minCenterPage;
  }),

  bounds: Ember.computed('centerPage', 'pagesToShow', 'totalPages', function () {
    let pagesToShow = this.get('pagesToShow');
    let totalPages = this.get('totalPages');

    if (totalPages < pagesToShow) {
      return {
        lower: 1,
        upper: totalPages
      };
    } else {
      let centerPage = this.get('centerPage');
      let range = Math.floor(pagesToShow / 2);
      let pagesToShowIsEven = pagesToShow % 2 === 0;

      return {
        lower: centerPage - range,
        upper: centerPage + (pagesToShowIsEven ? range - 1 : range)
      };
    }
  }),

  pages: Ember.computed('bounds', function() {
    let bounds = this.get('bounds');

    var pages = [];
    for (let i = bounds.lower; i <= bounds.upper; i++) {
      pages.push(i);
    }

    return pages;
  }),

  onFirstPage: Ember.computed('currentPage', function() {
    return this.get('currentPage') === 1;
  }),

  onLastPage: Ember.computed('currentPage', 'totalPages', function() {
    return this.get('currentPage') === this.get('totalPages');
  }),

  actions: {
    previousPage() {
      let currentPage = this.get('currentPage');
      this.set('currentPage', currentPage - 1);
      this.sendAction('pageChanged', currentPage - 1);
    },

    nextPage() {
      let currentPage = this.get('currentPage');
      this.set('currentPage', currentPage + 1);
      this.sendAction('pageChanged', currentPage + 1);
    },

    setPage(page) {
      this.set('currentPage', page);
      this.sendAction('pageChanged', page);
    }
  }
});
