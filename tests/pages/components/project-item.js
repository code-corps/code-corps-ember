import {
  attribute, text
} from 'ember-cli-page-object';

export default {
  scope: '.project-item',

  description: text('p'),
  icon: {
    scope: 'img',
    src: attribute('src')
  },
  title: text('h4')
};
