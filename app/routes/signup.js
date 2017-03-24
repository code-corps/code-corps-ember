import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { isNonValidationError } from 'code-corps-ember/utils/error-utils';

const {
  get,
  Route,
  inject: { service },
  set
} = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  queryParams: { donate: false },

  /**
   * Model hook initializes and returns a new user record
   *
   * There is a specific case when an unauthenticated user will navigate to the
   * project.donate route. They will get redirected to signup here, with a
   * `donate=true` query parameter.
   *
   * This changes initialization of the user so they start with a 'donating'
   * state, instead of the default 'signing_up'.
   */
  model({ donate }) {
    let user = donate ? { state: 'signed_up_donating' } : {};
    return get(this, 'store').createRecord('user', user);
  },

  session: service(),

  actions: {
    signIn(credentials) {
      get(this, 'session').authenticate('authenticator:jwt', credentials);
    },

    handleErrors(payload) {
      if (isNonValidationError(payload)) {
        set(this, 'controller.signup.error', payload);
      }
    }
  }
});
