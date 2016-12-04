import {
  clickable,
  collection,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.thank-you-container',

  icon: {
    scope: '[data-test-selector="project icon"]'
  },

  clickLink: clickable('a'),

  thankYouText: text('[data-test-selector="thank you message"]'),

  volunteers: collection({
    scope: '[data-test-selector="volunteer headshot"]'
  })
};
