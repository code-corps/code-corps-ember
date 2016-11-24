import { clickable, isVisible, text } from 'ember-cli-page-object';
import creditCard from './credit-card';
import cardList from './card-list';

export default {
  scope: '.donation-container',

  cardList,
  creditCard,

  addNewCardButtonIsVisible: isVisible('button.card-list__button--small'),
  cardFormIsVisible: isVisible('.credit-card-form'),
  cardListIsVisible: isVisible('.card-list'),
  donationButtonIsVisible: isVisible('button.donate'),

  clickAddCard: clickable('button.card-list__button--small'),
  clickSubmit: clickable('button.donate'),

  donationAmountText: text('.donation-container__amount'),
  paymentInformationText: text('.donation-container__information')
};
