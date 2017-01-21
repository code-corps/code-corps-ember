import { clickable, fillable, is, isVisible } from 'ember-cli-page-object';

export default {
  scope: '.personal-id-number',

  clickSubmit: clickable('button'),

  legalEntityPersonalIdNumber: fillable('input[type=text]'),
  legalEntityPersonalIdNumberFieldIsDisabled: is(':disabled', 'input[type=text]'),

  renderslegalEntityPersonalIdNumberField: isVisible('input[type=text]'),
  rendersSubmitButton: isVisible('button'),

  submitButtonIsDisabled: is(':disabled', 'button')
};
