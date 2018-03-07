import {
  clickable,
  collection,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.thank-you-container',

  icon: {
    scope: '[data-test-project-icon]'
  },

  clickLink: clickable('a'),

  thankYouText: text('[data-test-thank-you-message]'),

  volunteers: collection('[data-test-volunteer-headshot]')
};
