import Ember from 'ember';

const {
  Component,
  computed: { equal },
  get,
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
        stripeConnectAccount.setProperties({
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

    if (get(stripeConnectAccount, 'legalEntityType') === null) {
      set(stripeConnectAccount, 'legalEntityType', 'individual');
    }

    if (get(stripeConnectAccount, 'legalEntityAddressState') == null) {
      set(stripeConnectAccount, 'legalEntityAddressState', 'CA');
    }

    if (get(stripeConnectAccount, 'legalEntityAddressCountry') == null) {
      set(stripeConnectAccount, 'legalEntityAddressCountry', 'US');
    }

    let legalEntityDobDay = get(stripeConnectAccount, 'legalEntityDobDay') || 1;
    let legalEntityDobMonth = get(stripeConnectAccount, 'legalEntityDobMonth') || 1;
    let legalEntityDobYear = get(stripeConnectAccount, 'legalEntityDobYear') || new Date().getUTCFullYear() - 13;

    setProperties(stripeConnectAccount, { legalEntityDobDay, legalEntityDobMonth, legalEntityDobYear });
  }
});
