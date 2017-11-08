import { clickable, hasClass, is, isVisible } from 'ember-cli-page-object';
import country from 'code-corps-ember/tests/pages/components/select/country-select';

export default {
  scope: '.create-account',

  clickSubmit: clickable('button'),

  countrySelect: country,

  countrySelectIsDisabled: is(':disabled', 'select'),

  hasRequiredStatus: hasClass('panel--highlighted'),
  hasVerifiedStatus: hasClass('panel--highlighted-green'),

  rendersHeader: isVisible('aside'),
  rendersSection: isVisible('[data-test-section]'),
  rendersStripeLegal: isVisible('a[href="https://stripe.com/connect-account/legal"][target="_blank"]'),
  submitButtonIsDisabled: is(':disabled', 'button')
};
