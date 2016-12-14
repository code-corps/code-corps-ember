import { value } from 'ember-cli-page-object';

export default {
  scope: '.contact-info',
  email: value('input[name=email]')
};
