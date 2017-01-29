import Ember from 'ember';

const {
  Component,
  computed,
  computed: { and, not, or },
  get,
  inject: { service },
  set
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
    let month = get(this, 'month');
    let year = get(this, 'year');
    return `${month} ${year}`;
  }),

  isCardNumberValid: computed('cardNumber', function() {
    let stripe = get(this, 'stripe');
    let cardNumber = get(this, 'cardNumber');
    return stripe.card.validateCardNumber(cardNumber);
  }),

  isCVCValid: computed('cvc', function() {
    let stripe = get(this, 'stripe');
    let cvc = get(this, 'cvc');
    return stripe.card.validateCVC(cvc);
  }),

  isExpiryValid: computed('date', function() {
    let stripe = get(this, 'stripe');
    let date = get(this, 'date');
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
    set(this, 'month', currentMonth);
    let currentYear = date.getFullYear();
    set(this, 'year', currentYear);
    let years = this.generateYears(currentYear);
    set(this, 'years', years);
  },

  clearForm() {
    set(this, 'cvc', '');
    set(this, 'cardNumber', '');
    this.setFreshDate();
  },

  actions: {
    submit() {
      let cardAttrs = this.getProperties('cvc', 'cardNumber', 'year', 'month');
      let onSubmit = get(this, 'submit');

      onSubmit(cardAttrs);
    }
  }
});
