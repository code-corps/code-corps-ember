import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { get, computed } from '@ember/object';

export default Component.extend({
  classNameBindings: ['statusClass'],
  classNames: ['funds-recipient', 'account-setup__section'],

  status: alias('stripeConnectAccount.recipientStatus'),

  statusClass: computed('status', function() {
    return `account-setup__section--${get(this, 'status')}`;
  })
});
