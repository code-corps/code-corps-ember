import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { merge } from '@ember/polyfills';
import RSVP from 'rsvp';
import { set, get } from '@ember/object';
import FriendlyError from 'code-corps-ember/utils/friendly-error';

const ACCOUNT_CREATION_ERROR = 'There was a problem with creating your account. Please check your input and try again.';
const ACCOUNT_UPDATE_ERROR = 'There was a problem with your account information. Please check your input and try again.';
const BANK_ACCOUNT_TOKEN_CREATION_ERROR = 'There was a problem in using your bank account information. Please check your input and try again.';
const BANK_ACCOUNT_ADDING_ERROR = 'There was a problem submitting your bank account information.';
const PERSONAL_ID_NUMBER_TOKEN_CREATION_ERROR = 'There was a problem in using your personal ID number. Please check your input and try again.';
const VERIFICATION_DOCUMENT_ERROR = 'There was a problem with attaching your document. Please try again.';

export default Controller.extend({
  currentUser: service(),
  store: service(),
  stripe: service(),

  stripeConnectAccount: alias('project.organization.stripeConnectAccount'),

  actions: {
    onCreateStripeConnectAccount(properties) {
      this._startAction();

      get(this, 'project.organization')
        .then((organization) => this._createStripeAccount(organization, properties))
        .catch((reason) => this._handleError(reason))
        .finally(() => this._endAction());
    },

    onRecipientDetailsSubmitted() {
      this._startAction();

      get(this, 'stripeConnectAccount')
        .then((stripeConnectAccount) => this._updateRecipientDetails(stripeConnectAccount))
        .catch((reason) => this._handleError(reason))
        .finally(() => this._endAction());
    },

    onBankAccountInformationSubmitted({ accountNumber, routingNumber }) {
      this._startAction();

      let promises = {
        tokenData: this._createAccountToken(accountNumber, routingNumber),
        stripeConnectAccount: get(this, 'stripeConnectAccount')
      };

      RSVP.hash(promises)
        .then(({ tokenData, stripeConnectAccount }) => this._addBankAccount(tokenData, stripeConnectAccount))
        .catch((response) => this._handleError(response))
        .finally(() => this._endAction());
    },

    onVerificationDocumentSubmitted(stripeFileUploadId) {
      this._startAction();

      get(this, 'stripeConnectAccount')
        .then((account) => this._assignIdentityVerificationDocument(account, stripeFileUploadId))
        .catch((response) => this._handleError(response))
        .finally(() => this._endAction());
    },

    onLegalEntityPersonalIdNumberSubmitted(legalEntityPersonalIdNumber) {
      this._startAction();

      let promises = {
        tokenData: this._createPersonalIdNumberToken(legalEntityPersonalIdNumber),
        stripeConnectAccount: get(this, 'stripeConnectAccount')
      };

      RSVP.hash(promises)
        .then(({ tokenData, stripeConnectAccount }) => this._assignLegalEntityPersonalIdNumber(tokenData, stripeConnectAccount))
        .catch((response) => this._handleError(response))
        .finally(() => this._endAction());
    }
  },

  // creating account

  _createStripeAccount(organization, properties) {
    let accountProperties = merge(properties, { organization });

    return get(this, 'store')
      .createRecord('stripe-connect-account', accountProperties)
      .save()
      .then(RSVP.resolve)
      .catch(() => this._wrapError(ACCOUNT_CREATION_ERROR));
  },

  // udating recipient info

  _updateRecipientDetails(stripeConnectAccount) {
    return stripeConnectAccount
      .save()
      .then(RSVP.resolve)
      .catch(() => this._wrapError(ACCOUNT_UPDATE_ERROR));
  },

  // uploading and assigning an id verification document

  _assignIdentityVerificationDocument(stripeConnectAccount, stripeFileUploadId) {
    set(stripeConnectAccount, 'legalEntityVerificationDocument', stripeFileUploadId);

    return stripeConnectAccount
      .save()
      .then(RSVP.resolve)
      .catch(() => this._wrapError(VERIFICATION_DOCUMENT_ERROR));
  },

  // assigning a personal id number

  _assignLegalEntityPersonalIdNumber(tokenData, stripeConnectAccount) {
    set(stripeConnectAccount, 'legalEntityPersonalIdNumber', tokenData.id);

    return stripeConnectAccount
      .save()
      .then(RSVP.resolve)
      .catch(() => this._wrapError(ACCOUNT_UPDATE_ERROR));
  },

  _createPersonalIdNumberToken(personalIdNumber) {
    let stripe = get(this, 'stripe');

    return stripe.piiData.createToken({ personalIdNumber })
      .then((stripeResponse) => RSVP.resolve(stripeResponse))
      .catch(() => this._wrapError(PERSONAL_ID_NUMBER_TOKEN_CREATION_ERROR));
  },

  // bank account - token step

  _createAccountToken(accountNumber, routingNumber) {
    let stripe = get(this, 'stripe');
    let params = this._bankAccountTokenParams(accountNumber, routingNumber);

    return stripe.bankAccount.createToken(params)
      .then((stripeResponse) => RSVP.resolve(stripeResponse))
      .catch(() => this._wrapError(BANK_ACCOUNT_TOKEN_CREATION_ERROR));
  },

  _bankAccountTokenParams(accountNumber, routingNumber) {
    return {
      account_number: accountNumber,
      country: 'US',
      currency: 'USD',
      object: 'bank_account',
      routing_number: routingNumber
    };
  },

  // bank account - updating connect account record step

  _addBankAccount(tokenData, stripeConnectAccount) {
    set(stripeConnectAccount, 'externalAccount', tokenData.id);

    return stripeConnectAccount
      .save()
      .then(RSVP.resolve)
      .catch(() => this._wrapError(BANK_ACCOUNT_ADDING_ERROR));
  },

  // friendly error wrapping

  _wrapError(message) {
    let friendlyError = new FriendlyError(message);
    return RSVP.reject(friendlyError);
  },

  // general catch-all error handler

  _handleError(error) {
    set(this, 'error', error);
  },

  _startAction() {
    set(this, 'isBusy', true);
    set(this, 'error', null);
  },

  _endAction() {
    set(this, 'isBusy', false);
  }
});
