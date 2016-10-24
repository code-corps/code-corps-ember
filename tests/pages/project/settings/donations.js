import {
  attribute,
  clickable,
  collection,
  create,
  fillable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable(':organization/:project/settings/donations'),

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

  clickAddNew: clickable('.add'),

  clickStripeConnectButton: clickable('.stripe-connect')
});
