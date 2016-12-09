import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: ['account-setup'],

  // set by binding
  email: null,

  // Preset values for testing
  fundsRecipient: {
    recipientType: 'company',
    firstName: 'John',
    lastName: 'Doe',

    businessType: 'sole_prop',
    businessName: 'Managed LLC',
    businessEin: '1234-managed',

    dob: '06-12-1986',

    dobDay: '06',
    dobMonth: '12',
    dobYear: '1986',

    address1: 'Some street 22',
    address2: 'PO 23',
    city: 'Los Angeles',
    state: 'CA',
    country: 'US',
    zip: '10000',
    ssnLast4: '1234'
  }
});
