import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, and, gte },
  inject: { service },
  run: { later }
} = Ember;

export default Component.extend({
  classNames: ['signup-form'],
  emailValid: false,
  hasError: false,
  usernameValid: false,

  session: service(),
  store: service(),

  canSubmit: and('emailValid', 'passwordValid', 'usernameValid'),
  passwordLength: alias('password.length'),
  passwordValid: gte('passwordLength', 6),

  password: computed('user.password', function() {
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
    }
  },

  _setError() {
    this.set('hasError', true);
  },

  _signIn(credentials) {
    this.get('session').authenticate(
      'authenticator:jwt',
      credentials);
  },

  _shakeButton() {
    if (!this.get('hasError')) {
      this.set('hasError', true);
      later(this, function() {
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
      let payloadContainsValidationErrors = error.errors.some((error) => error.status === 422);

      if (!payloadContainsValidationErrors) {
        this.controllerFor('signup').set('error', error);
      }
    });
  }
});
