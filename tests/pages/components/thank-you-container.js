import {
  clickable,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.thank-you-container',

  icon: {
    scope: '[data-test-selector="project icon"]'
  },

  clickLink: clickable('a'),

  thankYouText: text('[data-test-selector="thank you message"]')
};
