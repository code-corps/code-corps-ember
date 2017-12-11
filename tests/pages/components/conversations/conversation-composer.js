import { attribute } from 'ember-cli-page-object';
import submittableTextarea from 'code-corps-ember/tests/pages/components/submittable-textarea';

export default {
  scope: '.conversation-composer',

  submittableTextarea,

  submitButton: {
    scope: '[data-test-submit-button]',
    isDisabled: attribute('disabled')
  }
};
