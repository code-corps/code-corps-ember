import githubConnect from 'code-corps-ember/tests/pages/components/github-connect';
import { attribute } from 'ember-cli-page-object';

export default {
  scope: '.github-connect-state',
  githubConnect,
  githubUserInfo: {
    scope: '.github-connect-state__user',
    avatar: {
      scope: 'img',
      url: attribute('src')
    }
  }
};
