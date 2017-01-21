import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import ENV from 'code-corps-ember/config/environment';

const {
  computed,
  get,
  getProperties,
  isEmpty
} = Ember;

const { Uploader } = EmberUploader;

/**
 * `payments/funds-recipient/identity-document-file-upload` provides a file input
 * for uploading an identity verification document to stripe.
 *
 *
 * @class identity-document-file-upload
 * @module Component
 * @extends EmberUploader.FileField
 */
export default EmberUploader.FileField.extend({
  classNames: ['identity-document-file-upload'],

  /**
   * Object containing additional properties to be passed
   * in as part of the form data being uploaded
   * @type {Object}
   */
  additionalUploadData: {
    // required to authorize the upload request
    key: ENV.stripe.publishableKey,
    purpose: 'identity_document'
  },

  maxFileSize: 1024 * 1024 * 8, // 8mb
  multiple: false,
  supportedFileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
  url: 'https://uploads.stripe.com/v1/files',

  /**
   * A computed property containing settings for the ajax request
   * Used to set stripe account id in the request header
   * @return {Object}
   */
  ajaxSettings: computed('stripeConnectAccount', function() {
    let headers = {
      'Stripe-Account': get(this, 'stripeConnectAccount.idFromStripe')
    };

    return { headers };
  }),

  /**
   * Triggers when the file selection for the rendered file input changes
   * @param {[File]} files An array of files selected by the user.
   *                        Since the `multiple` setting is set to false, only 1 file
   *                        is in the array.
   */
  filesDidChange(files) {
    if (!isEmpty(files) && this._validate(files[0])) {
      this._performUpload(files[0]);
    }
  },

  _validate({ size, type }) {
    let { maxFileSize, supportedFileTypes } = getProperties(this, 'maxFileSize', 'supportedFileTypes');
    let isValid = (size <= maxFileSize) && (supportedFileTypes.indexOf(type) >= 0);

    if (!isValid) {
      this.sendAction('validationError');
    }

    return isValid;
  },

  _performUpload(file) {
    this.sendAction('uploadStarted');

    let params = getProperties(this, 'url', 'ajaxSettings');
    let uploader = Uploader.create(params);

    uploader.on('progress', (event) => this._handleUploadProgress(event));

    let additionalUploadData = get(this, 'additionalUploadData');

    uploader.upload(file, additionalUploadData)
            .then((event) => this._handleUploadDone(event))
            .catch((reason) => this._handleUploadError(reason));
  },

  // error handlers

  _handleUploadDone({ id }) {
    this.sendAction('uploadDone', id);
  },

  _handleUploadError(reason) {
    this.sendAction('uploadError', reason);
  },

  _handleUploadProgress(event) {
    this.sendAction('uploadProgress', event.percent);
  }
});
