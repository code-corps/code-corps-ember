import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: ['highlightClass'],
  classNames: ['donation-goals', 'panel'],

  project: null,
  stripeConnectAccount: null,

  donationsActive: alias('project.donationsActive'),
  payoutsEnabled: alias('stripeConnectAccount.payoutsEnabled'),

  status: computed('donationsActive', 'payoutsEnabled', function() {
    let donationsActive = get(this, 'donationsActive');
    let payoutsEnabled = get(this, 'payoutsEnabled');

    if (donationsActive) {
      return 'verified';
    } else if (payoutsEnabled) {
      return 'required';
    } else {
      return 'pending_requirement';
    }
  }),

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
