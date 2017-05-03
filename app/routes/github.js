import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  get,
  inject: { service },
  Route
} = Ember;

const CODE_INVALID = 'The GitHub authorization code is invalid.';

export default Route.extend(AuthenticatedRouteMixin, {
  queryParams: { code: { refreshModel: true } },

  ajax: service(),
  currentUser: service(),
  flashMessages:service(),
  store: service(),

  model({ code }) {
    return this._sendRequest(code);
  },

  afterModel(currentUserData) {
    get(this, 'store').pushPayload(currentUserData);
    return this.transitionTo('settings.profile');
  },

  actions: {
    error() {
      get(this, 'flashMessages').clearMessages().danger(CODE_INVALID);
      this.replaceWith('projects-list');
      return false;
    }
  },

  _sendRequest(code) {
    return get(this, 'ajax').post('/github-connect', {
      data: { code }
    });
  }
});
