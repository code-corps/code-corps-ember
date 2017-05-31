import {
  fillable,
  clickable,
  value,
  text,
  property,
  isVisible
} from 'ember-cli-page-object';

export default {
  scope: '.reset-password-form',

  sendResetPasswordSuccessfully(password, passwordConfirmation) {
    this.password(password).passwordConfirmation(passwordConfirmation).submit();
  },

  password: fillable('#password'),
  passwordLabel: text('[data-test-id="password-label"]'),
  passwordConfirmationLabel: text('[data-test-id="password-confirmation-label"]'),

  passwordConfirmation: fillable('#password-confirmation'),

  passwordInput: {
    scope: '#password',
    isVisible: isVisible(),
    value: value(),
    property: property('type')
  },

  passwordConfirmationInput: {
    scope: '#password-confirmation',
    isVisible: isVisible(),
    value: value(),
    property: property('type')
  },

  button: {
    scope: 'button'
  },

  submit: clickable('button')
};
