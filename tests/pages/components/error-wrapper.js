import {
  clickable,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.error-wrapper',

  clickLink: clickable('a'),

  title: {
    scope: 'h1',
    text: text()
  }
};
