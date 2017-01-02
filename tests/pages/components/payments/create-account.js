import { clickable, is, isVisible } from 'ember-cli-page-object';

export default {
  scope: '.create-account',

  clickSubmit: clickable('button'),

  countrySelectIsDisabled: is(':disabled', 'select'),
  rendersStripeLegal: isVisible('a[href="https://stripe.com/connect-account/legal"][target="_blank"]'),
  submitButtonIsDisabled: is(':disabled', 'button')
};
