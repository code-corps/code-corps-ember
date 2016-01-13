import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['login-form'],

  session: Ember.inject.service(),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        this.set('errors', reason.error || reason);
      });
    }
  }
});
