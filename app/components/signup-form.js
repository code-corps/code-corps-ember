import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Component,
  computed,
  computed: { alias, and, gte },
  run: { later }
} = Ember;

export default Component.extend({
  classNames: ['signup-form'],
  emailValid: false,
  hasError: false,
  usernameValid: false,

  canSubmit: and('emailValid', 'passwordValid', 'usernameValid'),
  passwordLength: alias('password.length'),
  passwordValid: gte('passwordLength', 6),

  password: computed('user.password', function() {
    return this.get('user.password') || '';
  }),

  actions: {
    emailValidated(result) {
      this.set('emailValid', result);
    },

    signUp() {
      if (this.get('canSubmit')) {
        this.get('_submit').perform();
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

  _shakeButton() {
    if (!this.get('hasError')) {
      this.set('hasError', true);
      later(this, function() {
        this.set('hasError', false);
      }, 1000);
    }
  },

  _submit: task(function* () {
    let credentials = {
      identification: this.get('user.email'),
      password: this.get('user.password')
    };

    let promise = this.get('user').save().then(() => {
      this.get('signIn')(credentials);
    }).catch((error) => {
      this.get('handleErrors')(error);
    });

    yield promise;
  }).drop()
});
