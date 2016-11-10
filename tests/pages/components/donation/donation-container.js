import { clickable, isVisible, text } from 'ember-cli-page-object';
import creditCard from './credit-card';
import cardList from './card-list';

export default {
  scope: '.donation-container',

  cardList,
  creditCard,

  cardFormIsVisible: isVisible('.credit-card-form'),
  cardListIsVisible: isVisible('.card-list'),
  donationButtonIsVisible: isVisible('button.donate'),

  clickSubmit: clickable('button.donate'),

  donationAmountText: text('.donation-amount'),
  paymentInformationText: text('.payment-information')
};
