import { clickable, isVisible, text } from 'ember-cli-page-object';
import creditCard from './credit-card';
import cardList from './card-list';

export default {
  scope: '.donation-container',

  cardList,
  creditCard,

  addNewCardButtonIsVisible: isVisible('button.add-card'),
  cardFormIsVisible: isVisible('.credit-card-form'),
  cardListIsVisible: isVisible('.card-list'),
  donationButtonIsVisible: isVisible('button.donate'),

  clickAddCard: clickable('button.add-card'),
  clickSubmit: clickable('button.donate'),

  donationAmountText: text('.donation-amount'),
  paymentInformationText: text('.payment-information')
};
