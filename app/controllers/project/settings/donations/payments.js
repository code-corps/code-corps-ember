import Ember from 'ember';
const {
  computed: { alias },
  Controller,
  get,
  inject: { service },
  merge
} = Ember;

export default Controller.extend({
  currentUser: service(),
  store: service(),

  user: alias('currentUser.user'),

  actions: {
    onRecipientInformationSubmitted(organization, email, recipientInformation) {
      let accountParams = merge(recipientInformation, { organization, email });
      get(this, 'store').createRecord('stripe-connect-account', accountParams)
                        .save();
    },

    onBankAccountInformationSubmitted(/* bankAccountInformation */) {
      // TODO: Handle receiving bank account information
    }
  }
});
