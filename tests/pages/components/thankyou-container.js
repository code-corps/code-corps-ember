import {
  attribute,
  text
} from 'ember-cli-page-object';

export default {
  icon: {
    scope: '[data-test-selector="project icon"]',
    alt: attribute('alt'),
    src: attribute('src')
  },

  thankYouText: text('[data-test-selector="thank you message"]')
};
