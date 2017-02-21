import {
  text
} from 'ember-cli-page-object';

export default {
  scope: '.flash',

  fixed: {
    scope: '.fixed-flash .fixed-flash-inner',
    message: text('p')
  },

  normal: {
    scope: '.container',
    message: text('p')
  }
};
