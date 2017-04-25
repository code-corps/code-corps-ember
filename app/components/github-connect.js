import Ember from 'ember';

const {
  Component,
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

  clientId: null,
  scope: null,
  state: null,
  redirectUri: null,

  init() {
    this._super(...arguments);
    let { clientId, scope, state, redirectUri } = this.getProperties('clientId', 'scope', 'state', 'redirectUri');
    set(this, 'url', `${baseUrl}?scope=${scope}&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`);
  }

});
