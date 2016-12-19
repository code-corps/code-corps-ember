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
const ACCOUNT_TOKEN_CREATION_ERROR = 'There was a problem with your bank account information. Please check your input and try again.';
const STRIPE_ACCOUNT_CREATION_ERROR = 'There was a problem with your account information. Please check your input and try again.';

export default Controller.extend({
  currentUser: service(),
  store: service(),
  stripe: service(),

  actions: {
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

    onPersonalIdNumberSubmitted() {
      // TODO: FIX THIS
      return;
    },

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

    onVerificationDocumentSubmitted() {
      // TODO: FIX THIS
      return;
    }
  },

  _addBankAccount(tokenData, stripeConnectAccount) {
    set(stripeConnectAccount, 'externalAccount', tokenData.id);

    return stripeConnectAccount.save()
            .then((stripeConnectAccount) => RSVP.resolve(stripeConnectAccount))
            .catch((reason) => this._handleAddBankAccountError(reason));
  },

  _bankAccountTokenParams(accountNumber, routingNumber) {
    return {
      account_number: accountNumber,
      routing_number: routingNumber,
      object: 'bank_account',
      country: 'US',
      currency: 'USD'
    };
  },

  _createAccountToken(accountNumber, routingNumber) {
    let stripe = get(this, 'stripe');
    let params = this._bankAccountTokenParams(accountNumber, routingNumber);

    return stripe.bankAccount.createToken(params)
                      .then((stripeResponse) => RSVP.resolve(stripeResponse))
                      .catch((reason) => this._handleBankAccountTokenError(reason));
  },

  _createStripeAccount(recipientInformation, organization, email) {
    let accountParams = merge(recipientInformation, { organization, email });

    return get(this, 'store')
      .createRecord('stripe-connect-account', accountParams)
      .save()
      .then((account) => RSVP.resolve(account))
      .catch((reason) => this._handleStripeAccountCreationError(reason));
  },

  _handleAddBankAccountError() {
    let friendlyError = new FriendlyError(ACCOUNT_ADDING_ERROR);
    return RSVP.reject(friendlyError);
  },

  _handleBankAccountTokenError() {
    let friendlyError = new FriendlyError(ACCOUNT_TOKEN_CREATION_ERROR);
    return RSVP.reject(friendlyError);
  },

  _handleError(error) {
    set(this, 'error', error);
  },

  _handleStripeAccountCreationError() {
    let friendlyError = new FriendlyError(STRIPE_ACCOUNT_CREATION_ERROR);
    return RSVP.reject(friendlyError);
  }
});
