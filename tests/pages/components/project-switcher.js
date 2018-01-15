import {
  attribute,
  hasClass
} from 'ember-cli-page-object';

import projectSwitcherMenu from 'code-corps-ember/tests/pages/components/project-switcher-menu';

export default {
  scope: '.project-switcher',

  body: {
    testContainer: 'html',
    scope: 'body',
    resetScope: true,

    hasHiddenStyle() {
      return this.style === 'overflow: hidden;';
    },

    style: attribute('style')
  },

  hasHiddenClass: hasClass('menu-hidden'),
  hasVisibleClass: hasClass('menu-visible'),

  menuLink: {
    scope: '[data-test-menu-link]'
  },

  overlay: {
    testContainer: '.ember-modal-wrapper',
    scope: '.ember-modal-overlay',
    resetScope: true
  },

  projectSwitcherMenu
};
