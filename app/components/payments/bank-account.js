import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  classNameBindings: ['highlightClass'],
  classNames: ['bank-account', 'panel', 'panel--separated'],

  accountNumber: null,
  routingNumber: null,

  status: alias('stripeConnectAccount.bankAccountStatus'),

  highlightClass: computed('status', function() {
    let status = get(this, 'status');

    if (status == 'verified') {
      return 'panel--highlighted-green';
    } else if (status == 'required') {
      return 'panel--highlighted';
    } else {
      return '';
    }
  })
});
