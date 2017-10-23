import { attribute } from 'ember-cli-page-object';

export default {
  scope: '.github-app-installation.unconnected',

  avatar: {
    scope: '[data-test-avatar]',
    url: attribute('src')
  },

  login: {
    scope: '[data-test-login]'
  },

  connect: {
    scope: '[data-test-connect]'
  }
};
