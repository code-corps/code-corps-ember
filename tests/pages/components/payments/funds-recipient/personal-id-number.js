import { clickable, fillable, is, isVisible } from 'ember-cli-page-object';

export default {
  scope: '.personal-id-number',

  clickSubmit: clickable('button'),

  personalIdNumber: fillable('input[type=text]'),
  personalIdNumberFieldIsDisabled: is(':disabled', 'input[type=text]'),

  rendersPersonalIdNumberField: isVisible('input[type=text]'),
  rendersSubmitButton: isVisible('button'),

  submitButtonIsDisabled: is(':disabled', 'button')
};
