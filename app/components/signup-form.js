import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['signup-form'],
  emailValid: false,
  hasError: false,
  usernameValid: false,

  session: Ember.inject.service(),
  store: Ember.inject.service(),

  canSubmit: Ember.computed.and('emailValid',
                                'passwordValid',
                                'usernameValid'),
  passwordLength: Ember.computed.alias('password.length'),
  passwordValid: Ember.computed.gte('passwordLength', 6),

  password: Ember.computed('user.password', function() {
    return this.get('user.password') || '';
  }),

  init() {
    this._super(...arguments);
    this.set('user', this.get('store').createRecord('user'));
  },

  actions: {
    emailValidated(result) {
      this.set('emailValid', result);
    },

    signUp() {
      if (this.get('canSubmit')) {
        this._submit();
      } else {
        this._shakeButton();
      }
    },

    usernameValidated(result) {
      this.set('usernameValid', result);
    },
  },

  _setError() {
    this.set('hasError', true);
  },

  _signIn(credentials) {
    this.get('session').authenticate(
      'authenticator:oauth2',
      credentials.identification,
      credentials.password);
  },

  _shakeButton() {
    if(!this.get('hasError')) {
      this.set('hasError', true);
      Ember.run.later(this, function() {
        this.set('hasError', false);
      }, 1000);
    }
  },

  _submit() {
    let credentials = {
      identification: this.get('user.email'),
      password: this.get('user.password')
    };

    this.get('user').save().then(() => {
      this._signIn(credentials);
    }).catch((error) => {
      if (error.errors.length === 1) {
        this.set('error', error);
      }
    });
  },
});
