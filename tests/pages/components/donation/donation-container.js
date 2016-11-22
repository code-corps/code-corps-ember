import { clickable, isVisible, text } from 'ember-cli-page-object';
import creditCard from './credit-card';
import cardList from './card-list';

export default {
  scope: '.donation-container',

  cardList,
  creditCard,

  cardFormIsVisible: isVisible('.credit-card-form'),
  cardListIsVisible: isVisible('.card-list'),
  donationButtonIsVisible: isVisible('.donation-container--donate'),

  clickSubmit: clickable('.donation-container--donate'),

  donationAmountText: text('.donation-container__donation-amount'),
  paymentInformationText: text('.donation-container--payment-information')
};
