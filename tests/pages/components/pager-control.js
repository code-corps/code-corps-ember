import {
  attribute,
  collection
} from 'ember-cli-page-object';

export default {
  scope: '.pager-control',

  nextPage: {
    scope: '.next-page',
    href: attribute('href')
  },

  pages: collection('.page', { href: attribute('href') }),

  previousPage: {
    scope: '.previous-page',
    href: attribute('href')
  }
};
