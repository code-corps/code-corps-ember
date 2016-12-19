import Ember from 'ember';

const {
  Component, computed, get
} = Ember;

export default Component.extend({
  tagName: 'form',
  classNames: ['funds-recipient'],

  /*
    @property model
    @type StripeConnectAccount
  */
  model: null,

  /*
    Does the model have a pending status for personal id number?

    @property isPending
    @type Boolean
  */
  isPending: computed('model', 'model.pending_requirement', function() {
    let status = get(this, 'model.personal_id_number_status');
    return status === 'pending_requirement';
  }),
  /*
    Does the model have a verifying status for personal id number?

    @property isVerifying
    @type Boolean
  */
  isVerifying: computed('model', 'model.pending_requirement', function() {
    let status = get(this, 'model.personal_id_number_status');
    return status === 'verifying';
  })
});
