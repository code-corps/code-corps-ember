import { attribute } from 'ember-cli-page-object';

export default {
  icon: {
    scope: '.select-inline-dropdown__list-item__icon',
    url: attribute('src', 'img')
  },

  primary: {
    scope: '.select-inline-dropdown__list-item__content__primary',
    highlighted: {
      scope: 'strong'
    }
  },

  secondary: {
    scope: '.select-inline-dropdown__list-item__content__secondary',
    highlighted: {
      scope: 'strong'
    }
  }
};
