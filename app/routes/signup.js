import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

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

    handleErrors(error) {
      let { errors, status } = error;
      let payloadContainsValidationErrors = errors.some(() => status === 422);

      if (!payloadContainsValidationErrors) {
        set(this, 'controller.signup.error', error);
      }
    }
  }
});
