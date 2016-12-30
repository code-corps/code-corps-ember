import Ember from 'ember';
import FriendlyError from 'code-corps-ember/utils/friendly-error';

const {
  Controller,
  get,
  inject: { service },
  RSVP,
  set,
  setProperties
} = Ember;

const ACCOUNT_CREATION_ERROR = 'There was a problem with creating your account. Please check your input and try again.';
const ACCOUNT_UPDATE_ERROR = 'There was a problem with your account information. Please check your input and try again.';
const BANK_ACCOUNT_TOKEN_CREATION_ERROR = 'There was a problem in using your bank account information. Please check your input and try again.';
const BANK_ACCOUNT_ADDING_ERROR = 'There was a problem submitting your bank account information.';
const VERIFICATION_DOCUMENT_ERROR = 'There was a problem with attaching your document. Please try again.';

export default Controller.extend({
  currentUser: service(),
  store: service(),
  stripe: service(),

  actions: {
    onCreateStripeConnectAccount(country) {
      set(this, 'isBusy', true);

      get(this, 'project.organization')
        .then((organization) => this._createStripeAccount(organization, country))
        .catch((reason) => this._handleError(reason))
        .finally(() => set(this, 'isBusy', false));
    },

    onRecipientDetailsSubmitted(recipientInformation) {
      set(this, 'isBusy', true);

      get(this, 'stripeConnectAccount')
        .then((stripeConnectAccount) => this._updateRecipientDetails(stripeConnectAccount, recipientInformation))
        .catch((reason) => this._handleError(reason))
        .finally(() => set(this, 'isBusy', false));
    },

    onBankAccountInformationSubmitted({ accountNumber, routingNumber }) {
      set(this, 'isBusy', true);

      let promises = {
        tokenData: this._createAccountToken(accountNumber, routingNumber),
        stripeConnectAccount: get(this, 'stripeConnectAccount')
      };

      RSVP.hash(promises)
          .then(({ tokenData, stripeConnectAccount }) => this._addBankAccount(tokenData, stripeConnectAccount))
          .catch((response) => this._handleError(response))
          .finally(() => set(this, 'isBusy', false));
    },

    onVerificationDocumentSubmitted(stripeFileUploadId) {
      set(this, 'isBusy', true);

      get(this, 'stripeConnectAccount')
        .then((account) => this._assignIdentityVerificationDocument(account, stripeFileUploadId))
        .catch((response) => this._handleError(response))
        .finally(() => set(this, 'isBusy', false));
    },

    onPersonalIdNumberSubmitted(personalIdNumber) {
      set(this, 'isBusy', true);

      get(this, 'stripeConnectAccount')
        .then((account) => this._assignPersonalIdNumber(account, personalIdNumber))
        .catch((response) => this._handleError(response))
        .finally(() => set(this, 'isBusy', false));
    }
  },

  // creating account

  _createStripeAccount(organization, country) {
    return get(this, 'store')
      .createRecord('stripe-connect-account', { organization, country })
      .save()
      .then(RSVP.resolve)
      .catch(() => this._wrapError(ACCOUNT_CREATION_ERROR));
  },

  // udating recipient info

  _updateRecipientDetails(stripeConnectAccount, recipientDetails) {
    setProperties(stripeConnectAccount, recipientDetails);

    return stripeConnectAccount
      .save()
      .then(RSVP.resolve)
      .catch(() => this._handleRecipientDetailsUpdateError(ACCOUNT_UPDATE_ERROR));
  },

  // uploading and assigning an id verification document

  _assignIdentityVerificationDocument(stripeConnectAccount, stripeFileUploadId) {
    set(stripeConnectAccount, 'identityDocumentId', stripeFileUploadId);

    return stripeConnectAccount
      .save()
      .then(RSVP.resolve)
      .catch(() => this._wrapError(VERIFICATION_DOCUMENT_ERROR));
  },

  // assigning a personal id number

  _assignPersonalIdNumber(stripeConnectAccount, personalIdNumber) {
    set(stripeConnectAccount, 'personalIdNumber', personalIdNumber);

    return stripeConnectAccount
      .save()
      .then(RSVP.resolve)
      .catch(() => this._wrapError(ACCOUNT_UPDATE_ERROR));
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
  }
});
