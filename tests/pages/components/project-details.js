import {
  attribute
} from 'ember-cli-page-object';

export default {
  scope: '.project__header',

  joinProjectButton: {
    scope: 'aside button',
    href: attribute('href'),
    disabled: attribute('disabled')
  },

  signUpLink: {
    scope: 'aside a',
    href: attribute('href')
  }
};
