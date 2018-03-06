import { collection, text } from 'ember-cli-page-object';

export default {
  scope: '.error-formatter',
  errors: collection('.error', { message: text() })
};
