import {
  attribute
} from 'ember-cli-page-object';

export default {
  button: {
    scope: '.default',
    href: attribute('href')
  }
};
