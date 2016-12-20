import Ember from 'ember';
import FriendlyError from 'code-corps-ember/utils/friendly-error';

const {
  Controller,
  get,
  inject: { service },
  merge,
  RSVP,
  set
} = Ember;

const ACCOUNT_ADDING_ERROR = 'There was a problem submitting your bank account information.';
const ACCOUNT_TOKEN_CREATION_ERROR = 'There was a problem in using your bank account information. Please check your input and try again.';
const STRIPE_ACCOUNT_CREATION_ERROR = 'There was a problem with your account information. Please check your input and try again.';
const VERIFICATION_DOCUMENT_ERROR = 'There was a problem in attaching the verification document to your stripe account';

export default Controller.extend({
  currentUser: service(),
  store: service(),
  stripe: service(),

  actions: {
    onRecipientDetailsSubmitted(recipientInformation) {
      set(this, 'isBusy', true);

      let promises = {
        organization: get(this, 'project.organization'),
        email: get(this, 'currentUser.user.email')
      };

      RSVP.hash(promises)
          .then(({ organization, email }) => this._createStripeAccount(recipientInformation, organization, email))
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

    onPersonalIdNumberSubmitted() {
      console.log(arguments);
    }
  },

  // creating a stripe account

  _createStripeAccount(recipientInformation, organization, email) {
    let accountParams = merge(recipientInformation, { organization, email });

    return get(this, 'store')
      .createRecord('stripe-connect-account', accountParams)
      .save()
      .then((account) => RSVP.resolve(account))
      .catch((reason) => this._handleStripeAccountCreationError(reason));
  },

  _handleStripeAccountCreationError() {
    let friendlyError = new FriendlyError(STRIPE_ACCOUNT_CREATION_ERROR);
    return RSVP.reject(friendlyError);
  },

  // uploading and assigning an id verification document

  _assignIdentityVerificationDocument(account, stripeFileUploadId) {
    set(account, 'identityDocumentId', stripeFileUploadId);

    return account.save()
                  .then((account) => RSVP.resolve(account))
                  .catch((reason) => this._handleIdentityVerificationDocumentError(reason));
  },

  _handleIdentityVerificationDocumentError() {
    let friendlyError = new FriendlyError(VERIFICATION_DOCUMENT_ERROR);
    return RSVP.reject(friendlyError);
  },

  // bank account - token step

  _createAccountToken(accountNumber, routingNumber) {
    let stripe = get(this, 'stripe');
    let params = this._bankAccountTokenParams(accountNumber, routingNumber);

    return stripe.bankAccount.createToken(params)
                      .then((stripeResponse) => RSVP.resolve(stripeResponse))
                      .catch((reason) => this._handleBankAccountTokenError(reason));
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

  _handleBankAccountTokenError() {
    let friendlyError = new FriendlyError(ACCOUNT_TOKEN_CREATION_ERROR);
    return RSVP.reject(friendlyError);
  },

  // bank account - updating connect account record step

  _addBankAccount(tokenData, stripeConnectAccount) {
    set(stripeConnectAccount, 'externalAccount', tokenData.id);

    return stripeConnectAccount.save()
            .then((stripeConnectAccount) => RSVP.resolve(stripeConnectAccount))
            .catch((reason) => this._handleAddBankAccountError(reason));
  },

  _handleAddBankAccountError() {
    let friendlyError = new FriendlyError(ACCOUNT_ADDING_ERROR);
    return RSVP.reject(friendlyError);
  },

  // general catch-all error handler

  _handleError(error) {
    set(this, 'error', error);
  }
});
