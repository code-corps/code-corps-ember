import {
  isVisible
} from 'ember-cli-page-object';

export default {
  scope: '.signup-form',

  emailInput: {
    scope: 'input[name=email]',
    isVisible: isVisible()
  },

  passwordInput: {
    scope: 'input[name=password]',
    isVisible: isVisible()
  },

  signupButton: {
    scope: 'input[name=signup]',
    isVisible: isVisible()
  },

  usernameInput: {
    scope: 'input[name=username]',
    isVisible: isVisible()
  }
};
