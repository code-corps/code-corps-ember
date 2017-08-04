import { attribute } from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';

export default {
  scope: '.github-app-installation.unconnected',

  avatar: {
    scope: testSelector('avatar'),
    url: attribute('src')
  },

  login: {
    scope: testSelector('login')
  },

  connect: {
    scope: testSelector('connect')
  }
};
