import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import MarketingRouteMixin from 'code-corps-ember/mixins/marketing-route-mixin';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { isNonValidationError } from 'code-corps-ember/utils/error-utils';

export default Route.extend(MarketingRouteMixin, UnauthenticatedRouteMixin, {
  queryParams: { context: 'default' },

  session: service(),

  /**
   * Model hook initializes and returns a new user record
   *
   * We can pass a context of the signup, e.g. `'donating'`
   */
  model({ context }) {
    let user = context ? { signUpContext: context } : {};
    return get(this, 'store').createRecord('user', user);
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('context', 'default');
    }
  },

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
