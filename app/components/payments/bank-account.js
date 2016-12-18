import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  classNameBindings: ['statusClass'],
  classNames: ['bank-account', 'account-setup__section'],

  accountNumber: '000123456789',
  routingNumber: '110000000',

  status: computed.alias('stripeConnectAccount.bankAccountStatus'),

  statusClass: computed('status', function() {
    return `account-setup__section--${get(this, 'status')}`;
  })
});
