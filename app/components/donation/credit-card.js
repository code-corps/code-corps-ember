import Ember from 'ember';

const {
  Component,
  computed,
  computed: { and, not, or },
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['credit-card-form'],
  month: '',
  months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  year: '',
  years: [],

  /**
    @property stripe
    @type Ember.Service
   */
  stripe: service(),

  cardInvalid: not('cardValid'),
  cardValid: and('isCardNumberValid', 'isCVCValid', 'isExpiryValid'),

  isProcessingOrInvalid: or('isProcessing', 'cardInvalid'),

  date: computed('month', 'year', function() {
    let month = this.get('month');
    let year = this.get('year');
    return `${month} ${year}`;
  }),

  isCardNumberValid: computed('cardNumber', function() {
    let stripe = this.get('stripe');
    let cardNumber = this.get('cardNumber');
    return stripe.card.validateCardNumber(cardNumber);
  }),

  isCVCValid: computed('cvc', function() {
    let stripe = this.get('stripe');
    let cvc = this.get('cvc');
    return stripe.card.validateCVC(cvc);
  }),

  isExpiryValid: computed('date', function() {
    let stripe = this.get('stripe');
    let date = this.get('date');
    return stripe.card.validateExpiry(date);
  }),

  init() {
    this.setFreshDate();
    this._super(...arguments);
  },

  generateYears(currentYear) {
    let years = [];
    let endYear = currentYear + 20;
    while (endYear >= currentYear) {
      years.push(currentYear++);
    }
    return years;
  },

  setFreshDate() {
    let date = new Date();
    let currentMonth = `0${date.getMonth() + 1}`.slice(-2);
    this.set('month', currentMonth);
    let currentYear = date.getFullYear();
    this.set('year', currentYear);
    let years = this.generateYears(currentYear);
    this.set('years', years);
  },

  clearForm() {
    this.set('cvc', '');
    this.set('cardNumber', '');
    this.setFreshDate();
  },

  actions: {
    submit() {
      let cardAttrs = this.getProperties('cvc', 'cardNumber', 'year', 'month');
      let onSubmit = this.get('submit');

      onSubmit(cardAttrs);
    }
  }
});
