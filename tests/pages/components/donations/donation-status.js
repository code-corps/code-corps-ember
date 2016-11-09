import { isVisible } from 'ember-cli-page-object';
import becomeADonorComponent from './become-a-donor';
import createDonationComponent from './create-donation';
import showDonationComponent from './show-donation';

export default {
  scope: '.donation-status',

  rendersBecomeADonor: isVisible('.become-a-donor'),
  rendersCreateDonation: isVisible('.create-donation'),
  rendersShowDonation: isVisible('.show-donation'),

  becomeADonor: becomeADonorComponent,
  createDonation: createDonationComponent,
  showDonation: showDonationComponent
};
