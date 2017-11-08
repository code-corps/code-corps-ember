import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { get, computed } from '@ember/object';

export default Component.extend({
  classNameBindings: ['highlightClass'],
  classNames: ['funds-recipient', 'panel', 'panel--separated'],

  status: alias('stripeConnectAccount.recipientStatus'),

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
