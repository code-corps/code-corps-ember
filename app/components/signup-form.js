import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['signup-form'],

  store: Ember.inject.service(),
  session: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.set('user', this.get('store').createRecord('user'));
  },

  signIn(credentials) {
    this.get('session').authenticate(
      'authenticator:oauth2',
      credentials.identification,
      credentials.password);
  },

  actions: {
    signUp() {
      let credentials = {
        identification: this.get('user.username'),
        password: this.get('user.password')
      };

      this.get('user').save().then(() => {
        this.signIn(credentials);
      }).catch((error) => {
        if (error.errors.length === 1) {
          this.set('error', error);
        }
      });
    }
  }
});
