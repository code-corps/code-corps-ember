import Ember from 'ember';
import ENV from 'code-corps-ember/config/environment';

const {
  Component,
  get,
  inject: { service },
  set
} = Ember;

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
  attributeBindings: ['url:href'],

  githubState: service(),

  clientId: `${ENV.github.clientId}`,
  redirectUri: `${ENV.github.redirectUri}`,
  scope: `${ENV.github.scope}`,
  state: null,

  init() {
    this._super(...arguments);
    this._initState();
    this._initUrl();
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
