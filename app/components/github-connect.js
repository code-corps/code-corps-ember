import ENV from 'code-corps-ember/config/environment';
import Component from '@ember/component';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

const baseUrl = 'https://github.com/login/oauth/authorize';

/**
  The github-connect component is used to to connect to github

  ## default usage

  ```handlebars
    {{github-connect state=state}}
  ```

  @module Component
  @class github-connect
  @extends Ember.Component
  @public
 */

export default Component.extend({
  tagName: 'a',
  classNames: ['github-connect', 'button', 'default'],
  attributeBindings: ['url:href', 'target:target'],

  githubState: service(),
  metrics: service(),

  clientId: `${ENV.github.clientId}`,
  redirectUri: `${ENV.github.redirectUri}`,
  scope: `${ENV.github.scope}`,
  state: null,
  target: null,
  url: null,

  init() {
    this._super(...arguments);
    this._initState();
    this._initUrl();
  },

  click() {
    get(this, 'metrics').trackEvent({
      event: 'Clicked Connect with GitHub'
    });
  },

  _initState() {
    let githubState = get(this, 'githubState').generate();
    set(this, 'state', githubState);
  },

  _initUrl() {
    let { clientId, scope, state, redirectUri }
      = this.getProperties('clientId', 'scope', 'state', 'redirectUri');

    set(this, 'url', `${baseUrl}?scope=${scope}&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`);
  }
});
