import { create, visitable } from 'ember-cli-page-object';
import createDonation from '../components/donations/create-donation';

export default create({
  createDonation,
  visit: visitable(':organization/:project/donate')
});
