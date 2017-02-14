import { isVisible, text } from 'ember-cli-page-object';

export default {
  scope: '.donation-progress',

  amountValue: text('.donation-progress__details__amount__value'),
  goalDescription: text('.donation-progress__description'),
  percentageLabel: text('.donation-progress__details__percentage__label'),
  percentageValue: text('.donation-progress__details__percentage__value'),
  rendersProgressBar: isVisible('.progress-bar')
};
