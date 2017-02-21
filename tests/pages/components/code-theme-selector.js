import {
  clickable,
  hasClass
} from 'ember-cli-page-object';

export default {
  scope: '.code-theme-selector',

  clickable,

  isDark: hasClass('dark'),
  isLight: hasClass('light')
};
