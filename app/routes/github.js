import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  get,
  inject: { service },
  Route
} = Ember;

const CODE_INVALID = 'The GitHub authorization code is invalid.';
const STATE_INVALID = 'Something went wrong while connecting to GitHub. Please try again.';

export default Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    // changing any of these query params needs to trigger the model hook, to
    // start the connect process
    code: { refreshModel: true },
    state: { refreshModel: true }
  },

  ajax: service(),
  currentUser: service(),
  githubState: service(),
  flashMessages:service(),
  store: service(),

  model({ code, state }) {
    let stateValidator = get(this, 'githubState');

    if (stateValidator.validate(state)) {
      return this._sendRequest(code);
    } else {
      get(this, 'flashMessages').clearMessages().danger(STATE_INVALID);
      return this.transitionTo('settings.profile');
    }
  },

  afterModel(currentUserData) {
    get(this, 'store').pushPayload(currentUserData);
    return this.transitionTo('settings.profile');
  },

  actions: {
    error() {
      get(this, 'flashMessages').clearMessages().danger(CODE_INVALID);
      this.replaceWith('settings.profile');
      return false;
    }
  },

  _sendRequest(code) {
    return get(this, 'ajax').post('/github-connect', {
      data: { code }
    });
  }
});
