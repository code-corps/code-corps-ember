import {
  attribute,
  collection,
  hasClass,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.project__menu',

  links: collection('li a', {
    badge: {
      scope: 'span.info',
      isVisible: isVisible(),
      text: text()
    },
    href: attribute('href'),
    isActive: hasClass('active'),
    isVisible: isVisible(),
    text: text()
  })
};
