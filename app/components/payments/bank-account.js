import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  classNameBindings: ['statusClass'],
  classNames: ['bank-account', 'account-setup__section'],

  accountNumber: null,
  routingNumber: null,

  status: alias('stripeConnectAccount.bankAccountStatus'),

  statusClass: computed('status', function() {
    return `account-setup__section--${get(this, 'status')}`;
  })
});
