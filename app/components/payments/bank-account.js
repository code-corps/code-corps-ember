import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  classNameBindings: ['statusClass'],
  classNames: ['bank-account', 'account-setup__section'],

  accountNumber: null,
  routingNumber: null,

  status: computed.alias('stripeConnectAccount.bankAccountStatus'),

  statusClass: computed('status', function() {
    return `account-setup__section--${get(this, 'status')}`;
  })
});
