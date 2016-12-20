import { isVisible, text } from 'ember-cli-page-object';

export default {
  errorText: text('.error'),
  rendersFileUpload: isVisible('input[type=file]')

};
