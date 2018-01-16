import {
  text
} from 'ember-cli-page-object';

export default {
  scope: '.flash-messages .container',

  message: text('p')
};
