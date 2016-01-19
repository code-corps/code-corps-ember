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

  pages: Ember.computed('centerPage', 'pagesToShow', function() {
    let centerPage = this.get('centerPage');
    let pagesToShow = this.get('pagesToShow');

    let range = Math.floor(pagesToShow / 2);
    let pagesToShowIsEven = pagesToShow % 2 === 0;

    let lowerBound = centerPage - range;
    let upperBound = centerPage + (pagesToShowIsEven ? range - 1 : range);

    var pages = [];
    for (let i = lowerBound; i <= upperBound; i++) {
      pages.push(i);
    }

    return pages;
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
