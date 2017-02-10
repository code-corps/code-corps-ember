import { isVisible } from 'ember-cli-page-object';
import userMenu from './user-menu';

export default {
  loginLinkVisible: isVisible('a.login'),

  logo: {
    scope: '.header__logo a'
  },
  logIn: {
    scope: 'a.login'
  },
  signUp: {
    scope: 'a.signup'
  },

  userMenu
};
