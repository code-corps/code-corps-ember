import Ember from 'ember';

const {
  Component, computed, get, set
} = Ember;

export default Component.extend({
  tagName: 'form',
  classNames: ['funds-recipient'],

  submit() {
    let action = get(this, 'onSubmit');
    if (typeof action === 'function') {
      let personalIDNumber = this.element.querySelector('input').value;
      let promise = action(personalIDNumber);
      set(this, 'promise', promise);
    }
    // no bubbling…
    return false;
  },

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
  }),
  /*
    Does the model have a verified status for personal id number?

    @property isVerified
    @type Boolean
  */
  isVerified: computed('model', 'model.pending_requirement', function() {
    let status = get(this, 'model.personal_id_number_status');
    return status === 'verified';
  })
});
