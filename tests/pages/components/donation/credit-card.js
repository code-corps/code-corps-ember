import { clickable, fillable, is, selectable, text } from 'ember-cli-page-object';

export default {
  scope: '.credit-card-form',

  cardCVC: fillable('[name=card-cvc]'),
  cardNumber: fillable('[name=card-number]'),
  cardMonth: selectable('select.month'),
  cardYear: selectable('select.year'),

  clickSubmit: clickable('button'),

  submitButtonText: text('button'),
  submitDisabled: is(':disabled', 'button')
};
