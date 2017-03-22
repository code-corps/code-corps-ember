import { clickable, isVisible } from 'ember-cli-page-object';
import showDonationComponent from './show-donation';

export default {
  scope: '.donation-status',

  clickLink: clickable('a'),

  rendersLink: isVisible('a'),
  rendersShowDonation: isVisible('.show-donation'),

  showDonation: showDonationComponent
};
