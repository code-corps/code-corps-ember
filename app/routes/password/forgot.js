import Ember from 'ember';
const { Route, get, inject: { service } } = Ember;

export default Route.extend({

  ajax: service(),

  actions: {
    forgotPassword(email) {
      return get(this, 'ajax').request('/password/forgot', {
        method: 'POST',
        data: {
          email
        }
      }).then(() => {
        this.transitionTo('index');
      });
    }
  }
});
