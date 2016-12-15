import Ember from 'ember';

const {
  Component, get, set
} = Ember;

export default Component.extend({
  tagName: 'form',
  classNames: ['funds-recipient'],

  init() {
    this.setProperties(get(this, 'fundsRecipient'));
    set(this, 'dobDay', 1);
    set(this, 'dobMonth', 1);
    set(this, 'dobYear', 2016);
    this._super(...arguments);
  },

  actions: {
    setBusinessType(value) {
      set(this, 'businessType', value);
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
