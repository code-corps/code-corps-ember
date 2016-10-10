import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, equal, gt }
} = Ember;

export default Component.extend({
  classNames: ['pager-control'],
  pagesToShow: 5,

  canShowPages: gt('totalPages', 1),
  currentPage: alias('options.currentPage'),
  hasOnePage: equal('totalPages', 1),
  onFirstPage: equal('currentPage', 1),
  pageSize: alias('options.pageSize'),
  totalPages: alias('options.totalPages'),
  totalRecords: alias('options.totalRecords'),

  bounds: computed('centerPage', 'pagesToShow', 'totalPages', function() {
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

  centerPage: computed('currentPage', 'pagesToShow', function() {
    let currentPage = this.get('currentPage');
    let pagesToShow = this.get('pagesToShow');

    let minCenterPage = Math.ceil(pagesToShow / 2);
    return (currentPage >= minCenterPage) ? currentPage : minCenterPage;
  }),

  nextPage: computed('currentPage', function() {
    return this.get('currentPage') + 1;
  }),

  onLastPage: computed('currentPage', 'totalPages', 'hasOnePage', function() {
    return this.get('currentPage') === this.get('totalPages') || this.get('hasOnePage');
  }),

  pages: computed('bounds', function() {
    let bounds = this.get('bounds');

    let pages = [];
    for (let i = bounds.lower; i <= bounds.upper; i++) {
      pages.push(i);
    }

    return pages;
  }),

  previousPage: computed('currentPage', function() {
    return this.get('currentPage') - 1;
  })
});
