import { attribute, collection } from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';
import githubRepo from 'code-corps-ember/tests/pages/components/github-repo';

export default {
  scope: '.github-app-installation.connected',

  avatar: {
    scope: testSelector('avatar'),
    url: attribute('src')
  },

  login: {
    scope: testSelector('login')
  },

  disconnect: {
    scope: testSelector('disconnect')
  },

  githubRepos: collection({
    itemScope: '.github-repo',
    item: githubRepo
  })
};
