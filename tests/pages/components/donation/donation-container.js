import {
  clickable,
  collection,
  is,
  isVisible,
  text
} from 'ember-cli-page-object';

import cardItem from './card-item';

export default {
  scope: '.donation-container',

  cardFormIsVisible: isVisible('.ember-stripe-card'),
  donationButtonIsVisible: isVisible('button.donate'),

  clickCancel: clickable('div.cancel-add-card a'),
  clickSubmit: clickable('button'),

  donationAmountText: text('.donation-container__amount'),
  paymentInformationText: text('.donation-container__information'),

  cards: collection({
    itemScope: '.card-item',
    item: cardItem
  }),

  submitButtonIsVisible: isVisible('button'),
  submitButtonText: text('button'),
  submitDisabled: is(':disabled', 'button')
};
