import {
  attribute,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.user-details',

  twitter: {
    scope: '.twitter',

    link: {
      scope: 'a',
      href: attribute('href'),
      text: text()
    }
  },
  website: {
    scope: '.website',

    link: {
      scope: 'a',
      href: attribute('href'),
      text: text()
    }
  }
};
