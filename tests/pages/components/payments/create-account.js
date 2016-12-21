import { clickable, is } from 'ember-cli-page-object';

export default {
  scope: '.create-account',

  clickSubmit: clickable('button'),

  countrySelectIsDisabled: is(':disabled', 'select'),
  submitButtonIsDisabled: is(':disabled', 'button')
};
