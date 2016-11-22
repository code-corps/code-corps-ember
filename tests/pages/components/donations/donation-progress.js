import { isVisible, text } from 'ember-cli-page-object';

export default {
  scope: '.donation-progress',

  amount: text('.donation-progress__amount .donation-progress__information__value'),
  description: text('.description'),
  percentage: text('.donation-progress__information__percentage .donation-progress__information__value'),
  rendersProgressBar: isVisible('.progress-bar')
};
