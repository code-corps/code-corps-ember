import {
  clickable,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.error-wrapper',

  body: text('p:first'),

  button: {
    scope: 'a.button',
    text: text()
  },

  clickLink: clickable('a'),

  has404Image: isVisible('.not-found-img'),
  hasServerErrorImage: isVisible('.server-error-img'),

  title: text('h1')
};
