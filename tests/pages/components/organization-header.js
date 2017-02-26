import {
  attribute,
  hasClass,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.organization-header',

  description: {
    scope: 'p',
    isVisible: isVisible(),
    text: text()
  },

  image: {
    scope: 'img',
    isLarge: hasClass('icon large'),
    isSmall: hasClass('icon'),
    src: attribute('src')
  },

  isExpanded: hasClass('expanded'),

  isVisible: isVisible(),

  title: {
    scope: 'h2',
    text: text()
  }
};
