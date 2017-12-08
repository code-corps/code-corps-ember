import {
  clickable,
  hasClass
} from 'ember-cli-page-object';

export default {
  scope: '.dropdown-menu',

  clickDropdownMenu: clickable('.dropdown-menu'),
  dropdownIsHidden: hasClass('menu-hidden')
};
