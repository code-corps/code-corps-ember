import {
  attribute,
  clickable,
  hasClass,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.user-menu',

  clickDropdownMenu: clickable('.dropdown-menu'),

  dropdownIsHidden: hasClass('menu-hidden'),

  icon: {
    scope: 'img',
    alt: attribute('alt'),
    src: attribute('src')
  },
  iconVisible: isVisible('img'),
  loginLinkVisible: isVisible('a.login'),
  logoutLinkVisible: isVisible('a.logout'),
  profileLinkVisible: isVisible('a.profile'),
  sluggedRouteLinkVisible: isVisible('a.slugged-route'),

  footerText: text('.dropdown__footer'),

  logOut: clickable('a.logout'),
  open: clickable('a'),
  toggle: clickable('a.user-menu__toggle'),

  profileLink: {
    scope: 'a.slugged-route',
    href: attribute('href')
  },
  settingsLink: {
    scope: '.profile',
    href: attribute('href')
  }
};
