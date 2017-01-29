import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const {
  get,
  inject: { service },
  Route,
  set
} = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  model() {
    return get(this, 'store').createRecord('user');
  },

  session: service(),

  actions: {
    signIn(credentials) {
      get(this, 'session').authenticate('authenticator:jwt', credentials);
    },

    handleErrors(error) {
      let { errors, status } = error;
      let payloadContainsValidationErrors = errors.some(() => status === 422);

      if (!payloadContainsValidationErrors) {
        set(this, 'controller.signup.error', error);
      }
    }
  }
});
