import Ember from 'ember';

const {
  Component,
  computed: { alias }
} = Ember;

export default Component.extend({
  classNames: ['personal-id-number'],
  status: alias('stripeConnectAccount.personalIdNumberStatus')
});
