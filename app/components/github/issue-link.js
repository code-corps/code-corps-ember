import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['github__issue-link'],

  metrics: service(),

  githubIssue: null,
  githubRepo: null,
  size: 'large',

  actions: {
    trackClick() {
      get(this, 'metrics').trackEvent({
        event: 'Clicked GitHub Link for Task'
      });
    }
  }
});
