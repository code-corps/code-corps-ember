import { isVisible } from 'ember-cli-page-object';
import becomeADonorComponent from './donation-status__become-a-donor';
import createDonationComponent from './donation-status__create-donation';
import showDonationComponent from './donation-status__show-donation';

export default {
  scope: '.donation-status',

  rendersBecomeADonor: isVisible('.donation-status__become-a-donor'),
  rendersCreateDonation: isVisible('.donation-status__create-donation'),
  rendersShowDonation: isVisible('.donation-status__show-donation'),

  becomeADonor: becomeADonorComponent,
  createDonation: createDonationComponent,
  showDonation: showDonationComponent
};
