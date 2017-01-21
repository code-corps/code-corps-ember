import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias },
  get
} = Ember;

export default Component.extend({
  classNameBindings: ['statusClass'],
  classNames: ['funds-recipient', 'account-setup__section'],

  status: alias('stripeConnectAccount.recipientStatus'),

  statusClass: computed('status', function() {
    return `account-setup__section--${get(this, 'status')}`;
  })
});
