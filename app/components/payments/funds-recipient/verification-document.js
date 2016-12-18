import Ember from 'ember';

const {
  Component, computed, get
} = Ember;

export default Component.extend({
  // tagName: 'funds-recipient classNames: ['funds-recipient'],

  /*
    @property model
    @type StripeConnectAccount
  */
  model: null,

  isPending: computed('model', 'model.pending_requirement', function() {
    let status = get(this, 'model.personal_id_number_status');
    debugger; return status === 'pending_requirement';
  })
});
