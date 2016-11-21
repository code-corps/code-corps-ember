import Ember from 'ember';

const {
  Controller,
  computed: { alias, bool, not },
  inject: { service },
  RSVP
} = Ember;

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
    saveCard(cardParams) {
      return this._createCreditCardToken(cardParams)
                 .then((stripeResponse) => this._createCardForPlatformCustomer(stripeResponse))
                 .then((stripeCard) => this._addCard(stripeCard))
                 .then(() => this._clearErrors())
                 .catch((reason) => this._handleError(reason))
                 .finally(() => this._updateAddingCardState());
    },

    donate(amount, stripeCard) {
      // I don't think we need a token anymore once the card was created
      // Should be enough to just pass in the selected stripe card. Stripe can use it
      // via id, I think
      return this._createSubscription(amount, stripeCard)
                 .then(() => this._transitionToThankYou())
                 .catch((reason) => this._handleError(reason));
    }
  },


  _createCreditCardToken(cardParams) {
    let stripeCard = this._tokenParams(cardParams);
    let stripe = this.get('stripe');

    return stripe.card.createToken(stripeCard);
  },

  _createCardForPlatformCustomer({ id }) {
    return this._ensureStripePlatformCustomer()
               .then(() => this._createStripePlatformCard(id));
  },

  _ensureStripePlatformCustomer() {
    console.log('_ensureStripePlatformCustomer', arguments);

    if (this.get('shouldCreateCustomer')) {
      return this._createStripePlatformCustomer();
    } else {
      return RSVP.resolve();
    }
  },

  _createStripePlatformCustomer() {
    console.log('_createStripePlatformCustomer', arguments);
    let { user, store } = this.getProperties('user', 'store');
    let email = user.get('email');

    return store.createRecord('stripe-platform-customer', { email, user })
                .save();
  },

  _createStripePlatformCard(stripeToken) {
    console.log('_createStripePlatformCard', stripeToken);
    let user = this.get('user');

    return user.get('stripePlatformCards')
               .createRecord({ stripeToken, user })
               .save();
  },

  _addCard(stripeCard) {
    console.log('_addCard', arguments);
    return this.get('user.stripePlatformCards').pushObject(stripeCard);
  },

  _createSubscription(amount, stripeCard) {
    let { project, store, user } = this.getProperties('project', 'store', 'user');
    let adapterOptions = { stripePlatformCardId: stripeCard.get('id') };
    let subscription = store.createRecord('stripe-subscription', { amount, project, user, stripeCard });

    return subscription.save({ adapterOptions });
  },

  _transitionToThankYou() {
    let project = this.get('project');
    return this.transitionToRoute('project.thankyou', project);
  },

  _handleError(error) {
    this.set('error', error);
  },

  _tokenParams(cardParams) {
    return {
      number: cardParams.cardNumber,
      cvc: cardParams.cvc,
      exp_month: cardParams.month,
      exp_year: cardParams.year
    };
  },

  _updateAddingCardState() {
    this.set('isAddingCard', false);
  },

  _clearErrors() {
    this.set('error', null);
  }
});
