import {
  text
} from 'ember-cli-page-object';

export default {
  scope: '.flash-messages .fixed-flash .fixed-flash-inner',

  message: text('p')
};
