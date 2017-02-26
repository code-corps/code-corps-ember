import {
  isVisible
} from 'ember-cli-page-object';

export default {
  header: {
    scope: '.organization-header',
    isVisible: isVisible()
  },

  menu: {
    scope: '.organization-menu',
    isVisible: isVisible()
  }
};
