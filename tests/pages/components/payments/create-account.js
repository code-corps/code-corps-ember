import { clickable, hasClass, is, isVisible } from 'ember-cli-page-object';

export default {
  scope: '.create-account',

  clickSubmit: clickable('button'),

  countrySelectIsDisabled: is(':disabled', 'select'),

  hasRequiredStatus: hasClass('account-setup__section--required'),
  hasVerifiedStatus: hasClass('account-setup__section--verified'),

  rendersHeader: isVisible('aside'),
  rendersSection: isVisible('section'),
  rendersStripeLegal: isVisible('a[href="https://stripe.com/connect-account/legal"][target="_blank"]'),
  submitButtonIsDisabled: is(':disabled', 'button')
};
