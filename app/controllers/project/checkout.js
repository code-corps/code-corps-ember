import Ember from 'ember';
import FriendlyError from 'code-corps-ember/utils/friendly-error';
import { isValidationError } from 'code-corps-ember/utils/error-utils';

const {
  Controller,
  computed: { alias, bool, not },
  get,
  getProperties,
  inject: { service },
  set,
  RSVP
} = Ember;

const CUSTOMER_CREATION_ERROR = 'There was a problem in connecting your account with our payment processor. Please try again.';
const CARD_CREATION_ERROR = 'There was a problem in using your payment information. Please try again.';
const SUBSCRIPTION_CREATION_ERROR = 'There was a problem in setting up your monthly donation. Please try again.';
const SUBSCRIPTION_VALIDATION_ERROR = "The amount you've set for your monthly donation is invalid.";

export default Controller.extend({
  amount: 10,
  queryParams: ['amount'],

  currentUser: service(),
  store: service(),
  stripev3: service(),

  project: alias('model'),
  user: alias('currentUser.user'),

  stripeCustomerCreated: bool('user.stripePlatformCustomer.id'),
  shouldCreateCustomer: not('stripeCustomerCreated'),

  actions: {
    // If the card does not exist yet
    saveAndDonate(amount, stripeElement) {
      this._clearErrors();
      this._updateisProcessing(true);

      return this._createStripeToken(stripeElement)
                 .then((token) => this._createCardForPlatformCustomer(token))
                 .then((stripeCard) => this._createSubscription(amount, stripeCard))
                 .then(() => this._transitionToThankYou())
                 .catch((response) => this._handleError(response))
                 .finally(() => this._updateisProcessing(false));
    },

    // If the card exists already
    donate(amount, stripeCard) {
      this._clearErrors();
      this._updateisProcessing(true);

      return this._createSubscription(amount, stripeCard)
                 .then(() => this._transitionToThankYou())
                 .finally(() => this._updateisProcessing(false));
    }
  },

  // Stripe token

  async _createStripeToken(stripeElement) {
    let stripe = get(this, 'stripev3');

    return await stripe.createToken(stripeElement).then(({ error, token }) => {
      if (error) {
        return this._handleCreditCardTokenError(error);
      } else if (token) {
        return RSVP.resolve(token);
      }
    });
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
    let { project, store, user } = getProperties(this, 'project', 'store', 'user');

    return store.createRecord('stripe-connect-subscription', { project, quantity, user })
                .save()
                .then((record) =>RSVP.resolve(record))
                .catch((response) => this._handleSubscriptionCreationError(response));
  },

  _handleSubscriptionCreationError(response) {
    let message = isValidationError(response) ? SUBSCRIPTION_VALIDATION_ERROR : SUBSCRIPTION_CREATION_ERROR;
    let friendlyError = new FriendlyError(message);

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

  _updateisProcessing(value) {
    set(this, 'isProcessing', value);
  },

  _clearErrors() {
    this.set('error', null);
  }
});
