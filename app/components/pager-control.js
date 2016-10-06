import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['pager-control'],
  pagesToShow: 5,

  canShowPages: Ember.computed.gt('totalPages', 1),
  currentPage: Ember.computed.alias('options.currentPage'),
  hasOnePage: Ember.computed.equal('totalPages', 1),
  pageSize: Ember.computed.alias('options.pageSize'),
  totalPages: Ember.computed.alias('options.totalPages'),
  totalRecords: Ember.computed.alias('options.totalRecords'),

  bounds: Ember.computed('centerPage', 'pagesToShow', 'totalPages', function () {
    let pagesToShow = this.get('pagesToShow');
    let totalPages = this.get('totalPages');

    if (totalPages < pagesToShow) {
      return {
        lower: 1,
        upper: totalPages
      };
    } else if(this.get('onLastPage')) {
      let currentPage = this.get('currentPage');

      return {
        lower: currentPage - (pagesToShow - 1),
        upper: currentPage
      }
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

  centerPage: Ember.computed('currentPage', 'pagesToShow', function() {
    let currentPage = this.get('currentPage');
    let pagesToShow = this.get('pagesToShow');

    let minCenterPage = Math.ceil(pagesToShow / 2);
    return (currentPage >= minCenterPage) ? currentPage: minCenterPage;
  }),

  nextPage: Ember.computed('currentPage', function() {
    return this.get('currentPage') + 1;
  }),

  onFirstPage: Ember.computed('currentPage', function() {
    return this.get('currentPage') === 1;
  }),

  onLastPage: Ember.computed('currentPage', 'totalPages', 'hasOnePage', function() {
    return this.get('currentPage') === this.get('totalPages') ||
      this.get('hasOnePage');
  }),

  pages: Ember.computed('bounds', function() {
    let bounds = this.get('bounds');

    var pages = [];
    for (let i = bounds.lower; i <= bounds.upper; i++) {
      pages.push(i);
    }

    return pages;
  }),

  previousPage: Ember.computed('currentPage', function() {
    return this.get('currentPage') - 1;
  }),
});
