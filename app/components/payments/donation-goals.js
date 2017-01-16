import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  classNameBindings: ['statusClass'],
  classNames: ['donation-goals', 'account-setup__section'],

  status: computed('donationsActive', 'transfersEnabled', function() {
    let donationsActive = get(this, 'donationsActive');
    let transfersEnabled = get(this, 'transfersEnabled');

    if (donationsActive) {
      return 'verified';
    } else if (transfersEnabled) {
      return 'required';
    } else {
      return 'pending_requirement';
    }
  }),

  statusClass: computed('status', function() {
    return `account-setup__section--${get(this, 'status')}`;
  })
});
