import { isVisible, text } from 'ember-cli-page-object';

export default {
  scope: '.donation-progress',

  amount: text('.amount .value'),
  description: text('.description'),
  percentage: text('.percentage .value'),
  rendersProgressBar: isVisible('.progress-bar')
};
