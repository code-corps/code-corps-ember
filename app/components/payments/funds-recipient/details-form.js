import Ember from 'ember';

const {
  Component,
  computed: { equal },
  get,
  isEmpty,
  set,
  setProperties
} = Ember;

export default Component.extend({
  classNames: ['details-form'],
  tagName: 'section',

  isIndividual: equal('stripeConnectAccount.legalEntityType', 'individual'),

  init() {
    this._super(...arguments);
    this._setDefaults();
  },

  actions: {
    submit() {
      let stripeConnectAccount = get(this, 'stripeConnectAccount');

      if (get(this, 'isIndividual')) {
        setProperties(stripeConnectAccount, {
          legalEntityBusinessName: null,
          legalEntityBusinessTaxId: null
        });
      }

      let onSubmit = get(this, 'onSubmit');
      onSubmit();
    }
  },

  _setDefaults() {
    let stripeConnectAccount = get(this, 'stripeConnectAccount');

    if (isEmpty(get(stripeConnectAccount, 'legalEntityType'))) {
      set(stripeConnectAccount, 'legalEntityType', 'individual');
    }

    if (isEmpty(get(stripeConnectAccount, 'legalEntityAddressState'))) {
      set(stripeConnectAccount, 'legalEntityAddressState', 'CA');
    }

    if (isEmpty(get(stripeConnectAccount, 'legalEntityAddressCountry'))) {
      set(stripeConnectAccount, 'legalEntityAddressCountry', 'US');
    }

    let legalEntityDobDay = get(stripeConnectAccount, 'legalEntityDobDay') || 1;
    let legalEntityDobMonth = get(stripeConnectAccount, 'legalEntityDobMonth') || 1;
    let legalEntityDobYear = get(stripeConnectAccount, 'legalEntityDobYear') || new Date().getUTCFullYear();

    setProperties(stripeConnectAccount, { legalEntityDobDay, legalEntityDobMonth, legalEntityDobYear });
  }
});
