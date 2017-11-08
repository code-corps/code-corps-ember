import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { set, get, computed } from '@ember/object';

const VALIDATION_ERROR = 'The file you selected is invalid. Only .jpg and .png images of up to 8mb in size are supported.';
const UPLOAD_ERROR = 'There was a problem with uploading your file. Please try again.';

export default Component.extend({
  classNames: ['verification-document'],
  tagName: 'section',

  status: alias('stripeConnectAccount.verificationDocumentStatus'),

  progressPercentage: 0,
  progressMessage: computed('progressPercentage', function() {
    let percentage = get(this, 'progressPercentage');
    return `Uploading... ${percentage}`;
  }),

  onUploadStarted() {
    set(this, 'isUploading', true);
    set(this, 'error', null);
  },

  onUploadProgress(percentage) {
    set(this, 'progressPercentage', percentage);
  },

  onUploadDone(stripeFileUploadId) {
    set(this, 'isUploading', false);
    let onVerificationDocumentSubmitted = get(this, 'onVerificationDocumentSubmitted');
    onVerificationDocumentSubmitted(stripeFileUploadId);
  },

  onUploadError() {
    set(this, 'isUploading', false);
    set(this, 'error', UPLOAD_ERROR);
  },

  onValidationError() {
    set(this, 'error', VALIDATION_ERROR);
  }
});
