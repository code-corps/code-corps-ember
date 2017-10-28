import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import {
  set,
  observer,
  getProperties,
  computed
} from '@ember/object';

export default Component.extend({
  classNames: ['create-donation'],

  amount: 25,
  fallbackAmount: 25,
  customAmount: null,
  presetAmounts: [10, 15, 25, 50],

  init() {
    this._super(...arguments);

    let { amount, presetAmounts }
      = getProperties(this, 'amount', 'presetAmounts');

    if (!presetAmounts.includes(amount)) {
      set(this, 'customAmount', amount);
    }
  },

  selectedAmount: computed('amount', 'customAmount', function() {
    let { amount, customAmount }
      = getProperties(this, 'amount', 'customAmount');

    return isEmpty(customAmount) ? amount : customAmount;
  }),

  amountChanged: observer('customAmount', function() {
    let { amount, customAmount, fallbackAmount, onAmountChanged, presetAmounts }
      = getProperties(this, 'amount', 'customAmount', 'fallbackAmount', 'onAmountChanged', 'presetAmounts');

    if (isEmpty(customAmount)) {
      if (!presetAmounts.includes(amount)) {
        onAmountChanged(fallbackAmount);
      }
    } else {
      onAmountChanged(customAmount);
    }
  }),

  actions: {
    selectPresetAmount(presetAmount) {
      set(this, 'amount', presetAmount);
      set(this, 'customAmount', null);
    }
  }
});
