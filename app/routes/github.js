import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { formatError } from 'code-corps-ember/utils/error-utils';

const {
  get,
  inject: { service },
  Route
} = Ember;

const STATE_INVALID = 'Something went wrong while connecting to GitHub. Please try again.';

export default Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    // changing any of these query params needs to trigger the model hook to
    // start the connect process
    code: { refreshModel: true },
    state: { refreshModel: true }
  },

  ajax: service(),
  currentUser: service(),
  githubState: service(),
  flashMessages: service(),
  store: service(),

  model({ code, state }) {
    let stateValidator = get(this, 'githubState');

    if (stateValidator.validate(state)) {
      return this._sendRequest(code, state);
    } else {
      get(this, 'flashMessages').clearMessages().danger(STATE_INVALID);
      return this.transitionTo('settings.integrations');
    }
  },

  afterModel(currentUserData) {
    get(this, 'store').pushPayload(currentUserData);
    return this.transitionTo('settings.integrations');
  },

  actions: {
    error(error) {
      let message = formatError(error);
      get(this, 'flashMessages').clearMessages().danger(message);
      this.replaceWith('settings.integrations');
      return false;
    }
  },

  _sendRequest(code, state) {
    return get(this, 'ajax').request('/oauth/github', {
      method: 'POST',
      data: { code, state }
    });
  }
});
