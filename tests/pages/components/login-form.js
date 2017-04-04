import {
  fillable,
  clickable,
  collection,
  isVisible
} from 'ember-cli-page-object';

export default {
  scope: '.login-form',

  emailInput: {
    scope: '[name=email]',
    isVisible: isVisible()
  },

  errors: collection({
    itemScope: 'p.error'
  }),

  loginSuccessfully(email, password) {
    this.username(email).password(password).submit();
  },

  loginUnsuccessfully(email, password) {
    this.username(email).password(password).submit();
  },

  password: fillable('[name=password]'),

  passwordInput: {
    scope: '[name=password]',
    isVisible: isVisible()
  },

  submit: clickable('button'),

  submitButton: {
    scope: 'button',
    isVisible: isVisible()
  },

  username: fillable('[name=email]'),

  forgotPasswordLink: {
    scope: '.t-forgot-password',
    isVisible: isVisible()
  }
};
