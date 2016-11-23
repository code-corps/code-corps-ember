import Ember from 'ember';
import { jwt_decode } from 'ember-cli-jwt-decode';

const {
  get,
  inject: { service },
  Route
} = Ember;

export default Route.extend({
  queryParams: {
    state: { as: 'state' },
    code: { as: 'code' }
  },
  code: null,
  state: null,

  session: service(),
  store: service(),

  model({ code = null, state = null }) {
    if (get(this, 'session.isAuthenticated')) {
      return this._onStripeRedirect(state, code);
    } else {
      this.transitionTo('projects-list');
    }
  },

  _onStripeRedirect(token, code) {
    return this._retrieveProject(token)
      .then((project) => {
        return this._createAccount(project, code)
          .then(() => this._transitionToDonations(project));
      }).catch(() => {
        // Need to handle errors here, like the 400 code already used
      });
  },

  _retrieveProject(token) {
    let data = jwt_decode(token);
    // 'aud' is in the format of 'Project:projectId'
    let [, projectId] = data.aud.split(':');
    // need to load the record to redirect to the project
    return get(this, 'store').findRecord('project', projectId);
  },

  _createAccount(project, code) {
    let organization = get(project, 'organization');
    let accountAttrs = { organization, accessCode: code };
    let stripeConnectAccount = get(this, 'store').createRecord('stripeConnectAccount', accountAttrs);
    return stripeConnectAccount.save();
  },

  _transitionToDonations(project) {
    this.transitionTo('project.settings.donations', project);
  }
});
