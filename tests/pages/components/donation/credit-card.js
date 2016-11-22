import { clickable, fillable, is, isVisible, selectable, text, value } from 'ember-cli-page-object';

export default {
  scope: '.credit-card-form',

  isCancelVisible: isVisible('.cancel-add-card a'),

  cardCVC: {
    scope: '[name=card-cvc]',
    fillIn: fillable(),
    value: value()
  },

  cardMonth: {
    scope: 'select.month',
    selectOption: selectable(),
    value: value()
  },

  cardNumber: {
    scope: '[name=card-number]',
    fillIn: fillable(),
    value: value()
  },

  cardYear: {
    scope: 'select.year',
    selectOption: selectable(),
    value: value()
  },

  clickSubmit: clickable('button.submit-card'),
  clickCancel: clickable('div.cancel-add-card a'),

  submitButtonText: text('button.submit-card'),
  submitDisabled: is(':disabled', 'button')
};
