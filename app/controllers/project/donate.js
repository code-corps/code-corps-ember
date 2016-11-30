import Ember from 'ember';
import FriendlyError from 'code-corps-ember/utils/friendly-error';
import { isValidationError } from 'code-corps-ember/utils/error-utils';

const {
  Controller,
  computed: { alias, bool, not },
  get,
  inject: { service },
  set,
  RSVP
} = Ember;

const CUSTOMER_CREATION_ERROR = 'There was a problem in connecting your account with our payment processor. Please try again.';
const CARD_CREATION_ERROR = 'There was a problem in using your payment information. Please try again.';
const SUBSCRIPTION_CREATION_ERROR = 'There was a problem in setting up your monthly donation. Please try again.';

export default Controller.extend({
  amount: null,
  isAddingCard: false,
  queryParams: ['amount'],

  currentUser: service(),
  store: service(),
  stripe: service(),

  project: alias('model'),
  user: alias('currentUser.user'),

  stripeCustomerCreated: bool('currentUser.user.stripePlatformCustomer.id'),
  shouldCreateCustomer: not('stripeCustomerCreated'),

  actions: {
    saveAndDonate(amount, cardParams) {
      this._clearErrors();
      this._updateIsLoading(true);

      return this._createCreditCardToken(cardParams)
                 .then((stripeResponse) => this._createCardForPlatformCustomer(stripeResponse))
                 .then((stripeCard) => this._createSubscription(amount, stripeCard))
                 .then(() => this._transitionToThankYou())
                 .catch((response) => this._handleError(response))
                 .finally(() => this._updateIsLoading(false));
    },

    donate(amount, stripeCard) {
      this._clearErrors();
      this._updateIsLoading(true);

      return this._createSubscription(amount, stripeCard)
                 .then(() => this._transitionToThankYou())
                 .finally(() => this._updateIsLoading(false));
    }
  },

  // credit card token

  _createCreditCardToken(cardParams) {
    let stripeCard = this._tokenParams(cardParams);
    let stripe = get(this, 'stripe');

    return stripe.card.createToken(stripeCard)
                      .then((stripeResponse) => RSVP.resolve(stripeResponse))
                      .catch((reason) => this._handleCreditCardTokenError(reason));
  },

  _handleCreditCardTokenError(response) {
    return RSVP.reject(response);
  },

  // card and customer logic

  _createCardForPlatformCustomer({ id }) {
    return this._ensureStripePlatformCustomer()
               .then(() => this._createStripePlatformCard(id));
  },

  _ensureStripePlatformCustomer() {
    if (get(this, 'shouldCreateCustomer')) {
      return this._createStripePlatformCustomer();
    } else {
      return RSVP.resolve();
    }
  },

  // platform customer

  _createStripePlatformCustomer() {
    let { user, store } = this.getProperties('user', 'store');
    let email = get(user, 'email');

    return store.createRecord('stripe-platform-customer', { email, user })
                .save()
                .then((record) =>RSVP.resolve(record))
                .catch((response) => this._handleCustomerCreationError(response));
  },

  _handleCustomerCreationError() {
    let friendlyError = new FriendlyError(CUSTOMER_CREATION_ERROR);
    return RSVP.reject(friendlyError);
  },

  // platform card

  _createStripePlatformCard(stripeToken) {
    let store = get(this, 'store');
    let user = get(this, 'user');
    let card = store.createRecord('stripe-platform-card', { stripeToken, user });
    return card.save()
               .then((record) =>RSVP.resolve(record))
               .catch((response) => this._handleCardCreationError(response));
  },

  _handleCardCreationError() {
    let friendlyError = new FriendlyError(CARD_CREATION_ERROR);
    return RSVP.reject(friendlyError);
  },

  // subscription

  _createSubscription(quantity) {
    let projectId = get(this, 'project.id');
    let user = get(this, 'user');
    let store = get(this, 'store');

    let subscription = store.createRecord('stripe-connect-subscription', { quantity, user });
    let adapterOptions = { projectId };

    return subscription.save({ adapterOptions })
                       .then((record) =>RSVP.resolve(record))
                       .catch((response) => this._handleSubscriptionCreationError(response));
  },

  _handleSubscriptionCreationError(response) {
    let friendlyError;

    if (isValidationError(response)) {
      friendlyError = new FriendlyError('The amount you\'ve set for your monthly donation is invalid.');
    } else {
      friendlyError = new FriendlyError(SUBSCRIPTION_CREATION_ERROR);
    }

    return RSVP.reject(friendlyError);
  },

  // transitioning

  _transitionToThankYou() {
    let project = get(this, 'project');
    return this.transitionToRoute('project.thank-you', project);
  },

  // setting error property

  _handleError(error) {
    this.set('error', error);
  },

  // helpers

  _tokenParams(cardParams) {
    return {
      number: cardParams.cardNumber,
      cvc: cardParams.cvc,
      exp_month: cardParams.month,
      exp_year: cardParams.year
    };
  },

  _updateIsLoading(value) {
    set(this, 'isLoading', value);
  },

  _clearErrors() {
    this.set('error', null);
  }
});
