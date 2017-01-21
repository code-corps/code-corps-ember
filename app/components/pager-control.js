import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, equal, gt }
} = Ember;

/**
  The `PagerControlComponent` provides pagination controls, e.g. previous/next

  ## default usage

  Pass in the options that describe the paging needs, like size, total, current.

  ```js
  options: {
    pageSize: 5,
    totalRecords: 7,
    currentPage: 1,
    totalPages: 2
  }
  ```

  ```handlebars
  {{pager-control options=options}}
  ```

  @class pager-control
  @module Component
  @extends Ember.Component
*/
export default Component.extend({
  classNames: ['pager-control'],

  /**
    Number of pages to show

    @property pagesToShow
    @type Number
  */
  pagesToShow: 5,

  /**
    Flag to check if there are at least one or more pages to show.

    @property canShowPages
    @type Boolean
  */
  canShowPages: gt('totalPages', 1),

  /**
    The current page number.

    @property currentPage
    @type Number
  */
  currentPage: alias('options.currentPage'),

  /**
    Flag to check if there is exactly one page.

    @property hasOnePage
    @type Boolean
  */
  hasOnePage: equal('totalPages', 1),

  /**
    Flag to check if the current page is the 1st page.

    @property onFirstPage
    @type Boolean
  */
  onFirstPage: equal('currentPage', 1),

  /**
    The page size, based on the options passed to the component.

    @property pageSize
    @type Number
  */
  pageSize: alias('options.pageSize'),

  /**
    The total number of pages, based on the options passed to the component.

    @property totalPages
    @type Number
  */
  totalPages: alias('options.totalPages'),

  /**
    The total number of records, based on the options passed to the component.

    @property totalRecords
    @type Number
  */
  totalRecords: alias('options.totalRecords'),

  /**
    An object with properties for the upper and lower page bounds.

    ```js
    {
      lower: {Number},
      upper: {Number}
    }
    ```

    @property bounds
    @type Object
  */
  bounds: computed('centerPage', 'pagesToShow', 'totalPages', function() {
    let pagesToShow = this.get('pagesToShow');
    let totalPages = this.get('totalPages');

    if (totalPages < pagesToShow) {
      return {
        lower: 1,
        upper: totalPages
      };
    } else if (this.get('onLastPage')) {
      let currentPage = this.get('currentPage');

      return {
        lower: currentPage - (pagesToShow - 1),
        upper: currentPage
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

  /**
    The median page number in the range for the total number of pages.

    @property centerPage
    @type Number
  */
  centerPage: computed('currentPage', 'pagesToShow', function() {
    let currentPage = this.get('currentPage');
    let pagesToShow = this.get('pagesToShow');

    let minCenterPage = Math.ceil(pagesToShow / 2);
    return (currentPage >= minCenterPage) ? currentPage : minCenterPage;
  }),

  /**
    The next page number.

    @property nextPage
    @type Number
  */
  nextPage: computed('currentPage', function() {
    return this.get('currentPage') + 1;
  }),

  /**
    Flag to check if the current page is the last page in the range.

    @property onLastPage
    @type Boolean
  */
  onLastPage: computed('currentPage', 'totalPages', 'hasOnePage', function() {
    return this.get('currentPage') === this.get('totalPages') || this.get('hasOnePage');
  }),

  /**
    A list of page numbers.

    @property pages
    @type Array
  */
  pages: computed('bounds', function() {
    let bounds = this.get('bounds');

    let pages = [];
    for (let i = bounds.lower; i <= bounds.upper; i++) {
      pages.push(i);
    }

    return pages;
  }),

  /**
    The previous page number.

    @property previousPage
    @type Number
  */
  previousPage: computed('currentPage', function() {
    return this.get('currentPage') - 1;
  })
});
