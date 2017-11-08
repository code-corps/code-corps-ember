import {
  clickable,
  fillable,
  is,
  isVisible,
  hasClass,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.bank-account',

  rendersPending: hasClass('panel'),
  rendersRequired: hasClass('panel--highlighted'),
  rendersVerified: hasClass('panel--highlighted-green'),

  rendersAccountNumberField: isVisible('[name=account-number]'),
  rendersRoutingNumberField: isVisible('[name=routing-number]'),
  rendersSubmitButton:isVisible('button'),

  accountLast4Text: text('.bank-account__account p'),
  bankNameText: text('.bank-account__bank-name p'),
  routingNumberText: text('.bank-account__routing p'),

  accountNumber: fillable('[name=account-number]'),
  routingNumber: fillable('[name=routing-number]'),

  clickSubmit: clickable('button'),

  accountNumberFieldIsDisabled: is(':disabled', '[name=account-number]'),
  routingNumberFieldIsDisabled: is(':disabled', '[name=routing-number]'),
  submitButtonIsDisabled: is(':disabled', 'button')
};
