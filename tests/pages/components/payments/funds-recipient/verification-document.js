import { clickable, isVisible, text } from 'ember-cli-page-object';

export default {
  scope: '.verification-document',
  errorText: text('.error'),
  rendersFileUpload: isVisible('input[type=file]'),
  clickSubmit: clickable('button')
};

