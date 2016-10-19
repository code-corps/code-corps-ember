import {
  attribute,
  clickable
} from 'ember-cli-page-object';

export default {
  logo: {
    scope: '.site-logo a'
  },
  logIn: {
    scope: 'a.login'
  },
  signUp: {
    scope: 'a.signup'
  },
  userMenu: {
    scope: '.user-menu',
    open: clickable('a.user-menu-select'),

    profileLink: {
      scope: 'a.slugged-route',
      href: attribute('href')
    },
    settingsLink: {
      scope: '.profile',
      href: attribute('href')
    },
    logOut: {
      scope: 'a.logout'
    }
  }
};
