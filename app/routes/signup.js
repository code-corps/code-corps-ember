import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { isNonValidationError } from 'code-corps-ember/utils/error-utils';

const {
  Route,
  inject: { service },
  set
} = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('user');
  },

  session: service(),

  actions: {
    signIn(credentials) {
      this.get('session').authenticate('authenticator:jwt', credentials);
    },

    handleErrors(payload) {
      if (isNonValidationError(payload)) {
        set(this, 'controller.signup.error', payload);
      }
    }
  }
});
