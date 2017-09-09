import { attribute, text } from 'ember-cli-page-object';

export default {
  image: {
    scope: 'img',

    alt: attribute('alt'),
    src: attribute('src')
  },

  name: text('[data-test-volunteer-name]'),
  role: text('[data-test-volunteer-role]')
};
