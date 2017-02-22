import {
  attribute
} from 'ember-cli-page-object';

export default {
  scope: '.progress-bar',

  displaysPercentage(n) {
    return this.style === `width: ${n}%;`;
  },

  style: attribute('style')
};
