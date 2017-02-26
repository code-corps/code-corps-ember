import {
  attribute,
  collection,
  hasClass,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.project__menu',

  links: collection({
    itemScope: 'li a',
    item: {
      badge: {
        scope: 'span.info',
        isVisible: isVisible(),
        text: text()
      },
      href: attribute('href'),
      isActive: hasClass('active'),
      isVisible: isVisible(),
      text: text()
    }
  })
};
