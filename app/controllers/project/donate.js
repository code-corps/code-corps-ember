import Ember from 'ember';

const {
  Controller,
  computed: { alias },
  inject: { service }
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

  actions: {
    addCard(cardParams) {
      return this._createCreditCardToken(cardParams)
                 .then((tokenData) => this._createCustomerAndCard(tokenData))
                 .then((stripeCard) => this._addCard(stripeCard))
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

  _createCustomerAndCard({ id, card }) {
    // TODO: Conditional create here
    return this._createstripePlatformCustomer(id)
               .then((/* stripePlatformCustomer */) => this._createStripeCard(card));
  },

  _createstripePlatformCustomer(/* token */) {
    let { user, store } = this.getProperties('user', 'store');
    let email = user.get('email');

    return store.createRecord('stripe-platform-customer', { email, user })
                .save();
  },

  _createStripeCard(cardData) {
    let user = this.get('user');
    let params = this._cardParams(cardData);

    return user.get('stripeCards')
               .createRecord(params)
               .save();
  },

  _addCard(stripeCard) {
    return this.get('user.stripeCards').pushObject(stripeCard);
  },

  _createSubscription(amount, stripeCard) {
    let { project, store, user } = this.getProperties('project', 'store', 'user');
    let subscription = store.createRecord('stripe-subscription', { amount, project, user, stripeCard });

    return subscription.save();
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

  _cardParams(params) {
    let { last4, name, brand, country, exp_month, exp_year } = params;
    return { brand, country, expMonth: exp_month, expYear: exp_year, last4, name };
  }
});
