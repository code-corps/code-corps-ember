import Ember from 'ember';
import FreestyleController from 'ember-freestyle/controllers/freestyle';

const { inject } = Ember;

export default FreestyleController.extend({
  emberFreestyle: inject.service(),
  card: {
    id: 1, brand: 'Visa', last4: 4242, expMonth: '01', expYear: '2022'
  },
  saveAndDonateHandler() {},
  donateHandler() {},
  project: {
    title: 'Test Project',
    description: 'Test project description',
    iconThumbUrl: 'icon.png'
  }
});
