import {
  attribute,
  clickable,
  collection,
  create,
  fillable,
  visitable
} from 'ember-cli-page-object';
import donationProgress from 'code-corps-ember/tests/pages/components/donations/donation-progress';

export default create({
  visit: visitable(':organization/:project/settings/donations'),

  donationProgress,

  donationGoals: collection({
    itemScope: '.donation-goals .donation-goal',
    item: {
      clickEdit: clickable('.edit')
    }
  }),

  editedDonationGoals: collection({
    itemScope: '.donation-goals .donation-goal-edit',
    item: {
      amount: fillable('input[name=amount]'),
      description: fillable('textarea[name=description]'),
      clickSave: clickable('.save'),
      clickCancel: clickable('.cancel')
    }
  }),

  stripeConnectButton: {
    scope: '.stripe-connect',
    href: attribute('href')
  },

  clickActivateDonationGoals: clickable('.activate-donations'),
  clickAddNew: clickable('.add'),
  clickStripeConnectButton: clickable('.stripe-connect')
});
