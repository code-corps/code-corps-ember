import { text } from 'ember-cli-page-object';
import progressBar from 'code-corps-ember/tests/pages/components/progress-bar';

export default {
  scope: '.project-card__donation-progress',

  amountValue: text('.project-card__donation-progress__details__amount__value'),
  percentageLabel: text('.project-card__donation-progress__details__percentage__label'),
  percentageValue: text('.project-card__donation-progress__details__percentage__value'),
  progressBar
};
