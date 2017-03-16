import { contains } from 'ember-cli-page-object';

export default {
  scope: '.card-logo__container',

  isAmex: contains('g#amex'),
  isDiners: contains('g#diners'),
  isDiscover: contains('g#discover'),
  isJCB: contains('g#jcb'),
  isMasterCard: contains('g#mastercard'),
  isVisa: contains('g#visa'),
  isUnknown: contains('g#unknown')
};
