import Ember from 'ember';

export default Ember.Component.extend({
  card: {
    id: 1, brand: 'Visa', last4: 4242, expMonth: '01', expYear: '2022'
  },
  saveAndDonateHandler() {},
  donateHandler() {}
});
