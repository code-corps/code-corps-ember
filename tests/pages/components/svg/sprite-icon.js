import {
  attribute,
  hasClass
} from 'ember-cli-page-object';

export default {
  scope: '.sprite-icon',

  svg: {
    scope: 'svg',

    hasClass,

    use: {
      scope: 'use',
      xlinkHref: attribute('xlink:href')
    }
  }
};
