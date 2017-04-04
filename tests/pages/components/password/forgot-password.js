import {
  fillable,
  clickable,
  value,
  text,
  isVisible
} from 'ember-cli-page-object';

export default {
  scope: '.forgot-password-form',

  sendForgotPasswordSuccessfully(email) {
    this.email(email).submit();
  },

  email: fillable('[name=email]'),

  emailInput: {
    scope: '[name=email]',
    isVisible: isVisible(),
    value: value()
  },

  button: {
    scope: 'button'
  },

  submit: clickable('button'),

  passwordHeader: text('[data-test-id="forgot-password-header"]')
};
