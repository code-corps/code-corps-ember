import Ember from 'ember';

const {
  Component, get, set
} = Ember;

export default Component.extend({
  tagName: 'form',
  classNames: ['funds-recipient'],

  init() {
    this.setProperties(get(this, 'fundsRecipient'));
    this._super(...arguments);
  },

  actions: {
    setBusinessType(value) {
      set(this, 'businessType', value);
    },

    setDob(value) {
      let dobDay = value.getDay() + 1;
      let dobMonth = value.getMonth() + 1;
      let dobYear = value.getFullYear();

      this.setProperties({ dobDay, dobMonth, dobYear });
    },

    setRecipientType(value) {
      set(this, 'recipientType', value);
    },

    submit() {
      let fundsRecipient = this.getProperties(
        'recipientType',
        'businessType', 'businessName', 'businessEin',
        'firstName', 'lastName', 'ssnLast4',
        'dobDay', 'dobMonth', 'dobYear',
        'address1', 'address2', 'city', 'state', 'country', 'zip'
      );

      this.sendAction('recipientInformationSubmitted', fundsRecipient);
    }
  }
});
