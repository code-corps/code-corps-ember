import { isVisible, text } from 'ember-cli-page-object';

export default {
  scope: '.donation-progress',

  amountValue: text('.amount .value'),
  goalDescription: text('.donation-progress__description'),
  percentageDescription: text('.percentage .description'),
  percentageValue: text('.percentage .value'),
  rendersProgressBar: isVisible('.progress-bar')
};
