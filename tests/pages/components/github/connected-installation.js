import { attribute, collection } from 'ember-cli-page-object';
import githubRepo from 'code-corps-ember/tests/pages/components/github-repo';

export default {
  scope: '.github-app-installation.connected',

  avatar: {
    scope: '[data-test-avatar]',
    url: attribute('src')
  },

  disconnect: {
    scope: '[data-test-disconnect]'
  },

  githubRepos: collection('.github-repo', githubRepo),

  login: {
    scope: '[data-test-login]'
  }
};
