import Ember from 'ember';
import FriendlyError from 'code-corps-ember/utils/friendly-error';

const {
  computed: { alias },
  Controller,
  get,
  inject: { service },
  merge,
  RSVP,
  set
} = Ember;

const ACCOUNT_TOKEN_CREATION_ERROR = 'There was a problem in using your bank account information. Please check your input and try again.';
const ACCOUNT_ADDING_ERROR = 'There was a problem in attaching the provided bank account information to your Stripe account.';

export default Controller.extend({
  currentUser: service(),
  store: service(),
  stripe: service(),

  user: alias('currentUser.user'),
  stripeConnectAccount: alias('project.organization.stripeConnectAccount'),

  actions: {
    onRecipientInformationSubmitted(organization, email, recipientInformation) {
      let accountParams = merge(recipientInformation, { organization, email });
      get(this, 'store').createRecord('stripe-connect-account', accountParams)
                        .save();
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
    }
  },

  // adding bank account information

  _createAccountToken(accountNumber, routingNumber) {
    let stripe = get(this, 'stripe');
    let params = this._bankAccountTokenParams(accountNumber, routingNumber);

    return stripe.bankAccount.createToken(params)
                      .then((stripeResponse) => RSVP.resolve(stripeResponse))
                      .catch((reason) => this._handleBankAccountTokenError(reason));
  },

  _handleBankAccountTokenError() {
    let friendlyError = new FriendlyError(ACCOUNT_TOKEN_CREATION_ERROR);
    return RSVP.reject(friendlyError);
  },

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

  _bankAccountTokenParams(accountNumber, routingNumber) {
    return {
      account_number: accountNumber,
      routing_number: routingNumber,
      object: 'bank_account',
      country: 'US',
      currency: 'USD'
    };
  },

  // setting error property

  _handleError(error) {
    this.set('error', error);
  }
});
