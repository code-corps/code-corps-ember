import Ember from 'ember';

const { Component, computed, isEmpty } = Ember;

export default Component.extend({
  classNames: ['create-donation'],
  presetAmounts: [10, 15, 25, 50],
  amount: 10,

  selectedAmount: computed('amount', 'customAmount', function() {
    let { amount, customAmount } = this.getProperties('amount', 'customAmount');
    return isEmpty(customAmount) ? amount : customAmount;
  })
});
