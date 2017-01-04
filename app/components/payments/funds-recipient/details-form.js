import Ember from 'ember';

const {
  Component,
  computed: { equal },
  get,
  set
} = Ember;

export default Component.extend({
  classNames: ['details-form'],
  tagName: 'section',

  isIndividual: equal('stripeConnectAccount.legalEntityType', 'individual'),

  init() {
    this._super(...arguments);
    let stripeConnectAccount = get(this, 'stripeConnectAccount');
    if (get(stripeConnectAccount, 'legalEntityType') === null) {
      set(this, 'stripeConnectAccount.legalEntityType', 'individual');
    }
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
  }
});
