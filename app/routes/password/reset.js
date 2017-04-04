import Ember from 'ember';
const { Route, get, set, inject: { service } } = Ember;

export default Route.extend({
  queryParams: {
    token: { refreshModel: true }
  },

  ajax: service(),
  session: service(),

  model(params) {
    return params.token;
  },

  setupController(controller, model) {
    set(controller, 'token', model);
  },

  actions: {
    resetPassword(password, passwordConfirmation) {
      return get(this, 'ajax').request('/password/reset', {
        method: 'POST',
        data: {
          token: get(this, 'controller.token'),
          password,
          'password-confirmation': passwordConfirmation
        }
      }).then((response) => {
        return get(this, 'session').authenticate('authenticator:jwt', { identification: response.email, password });
      });
    }
  }
});
