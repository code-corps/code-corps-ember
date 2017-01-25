import { hasClass, isVisible, text } from 'ember-cli-page-object';

export default {
  scope: '.user-menu',

  dropdownIsHidden: hasClass('menu-hidden'),

  avatarVisible: isVisible('img.avatar'),
  logoutLinkVisible: isVisible('a.logout'),
  profileLinkVisible: isVisible('a.profile'),
  sluggedRouteLinkVisible: isVisible('a.slugged-route'),

  footerText: text('.dropdown-footer')
};
