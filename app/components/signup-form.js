import Ember from 'ember';
import Component from '@ember/component';
import { gte, and, alias } from '@ember/object/computed';
import { later } from '@ember/runloop';
import { set, get, computed } from '@ember/object';
import { task } from 'ember-concurrency';

const { testing } = Ember;

const SHAKE_DELAY = testing ? 0 : 1000;

export default Component.extend({
  classNames: ['form--centered', 'signup-form'],
  emailValid: false,
  hasError: false,
  usernameValid: false,

  canSubmit: and('emailValid', 'passwordValid', 'usernameValid'),
  passwordLength: alias('password.length'),
  passwordValid: gte('passwordLength', 6),

  password: computed('user.password', function() {
    return get(this, 'user.password') || '';
  }),

  actions: {
    emailValidated(result) {
      set(this, 'emailValid', result);
    },

    signUp() {
      if (get(this, 'canSubmit')) {
        get(this, '_submit').perform();
      } else {
        this._shakeButton();
      }
    },

    usernameValidated(result) {
      set(this, 'usernameValid', result);
    }
  },

  _setError() {
    set(this, 'hasError', true);
  },

  _shakeButton() {
    if (!get(this, 'hasError')) {
      set(this, 'hasError', true);
      later(this, function() {
        set(this, 'hasError', false);
      }, SHAKE_DELAY);
    }
  },

  _submit: task(function* () {
    let credentials = {
      identification: get(this, 'user.email'),
      password: get(this, 'user.password')
    };

    let promise = get(this, 'user').save().then(() => {
      return get(this, 'signIn')(credentials);
    }).catch((error) => {
      return get(this, 'handleErrors')(error);
    });

    yield promise;
  }).drop()
});
