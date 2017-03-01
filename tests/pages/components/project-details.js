import {
  attribute,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.project__header',

  icon: {
    scope: '.project__header__icon img',
    src: attribute('src')
  },

  joinProjectButton: {
    scope: 'aside button',
    href: attribute('href'),
    disabled: attribute('disabled')
  },

  signUpLink: {
    scope: 'aside a',
    href: attribute('href')
  },

  title: {
    scope: '.project__header__title',
    text: text()
  }
};
