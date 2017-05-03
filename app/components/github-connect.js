import Ember from 'ember';

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
    {{github-connect clientId=clientId scope=scope state=state redirectUri=redirectUri}}
  ```

  @module Component
  @class github-connect
  @extends Ember.Component
  @public
 */

export default Component.extend({
  tagName: 'a',
  classNames: ['button', 'default'],
  attributeBindings: ['url:href'],

  githubState: service(),

  clientId: null,
  scope: null,
  state: null,
  redirectUri: null,

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
