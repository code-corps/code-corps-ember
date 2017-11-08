import {
  attribute,
  hasClass
} from 'ember-cli-page-object';

export default {
  scope: '.progress-bar',

  displaysPercentage(n) {
    return this.style === `width: ${n}%;`;
  },

  hasError: hasClass('progress-bar--error'),

  isAnimated: hasClass('progress-bar--animated'),

  style: attribute('style')
};
