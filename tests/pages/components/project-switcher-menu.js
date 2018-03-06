import {
  attribute,
  collection
} from 'ember-cli-page-object';

export default {
  scope: '.project-switcher-menu',

  menu: {
    testContainer: '.ember-modal-wrapper',
    scope: '[data-test-project-menu]',
    resetScope: true,

    newProjectLink: {
      scope: '[data-test-new-project]'
    },

    organizations: collection('[data-test-organization]'),

    projects: collection('[data-test-project]', {
      icon: {
        scope: '[data-test-icon]',
        url: attribute('src')
      }
    })
  }
};
