import {
  attribute
} from 'ember-cli-page-object';

export default {
  scope: '.project-details',

  joinProjectButton: {
    scope: '.join-project button',
    href: attribute('href')
  },

  signUpLink: {
    scope: '.join-project a',
    href: attribute('href')
  }
};
