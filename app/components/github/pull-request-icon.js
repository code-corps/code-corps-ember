import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['github__pull-request-icon'],

  merged: alias('githubPullRequest.merged'),
  state: alias('githubPullRequest.state')
});
