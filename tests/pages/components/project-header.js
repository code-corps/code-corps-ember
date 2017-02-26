import {
  attribute,
  text
} from 'ember-cli-page-object';

export default {
  description: {
    scope: 'p',
    text: text()
  },

  icon: {
    scope: 'img.icon',
    src: attribute('src')
  },

  title: {
    scope: 'h2',
    text: text()
  }
};
