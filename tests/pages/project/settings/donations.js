import {
  attribute,
  clickable,
  collection,
  create,
  fillable,
  text,
  visitable
} from 'ember-cli-page-object';
import donationProgress from 'code-corps-ember/tests/pages/components/donations/donation-progress';
import errorFormatter from 'code-corps-ember/tests/pages/components/error-formatter';

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
      clickCancel: clickable('.cancel'),
      validationErrors: collection({
        itemScope: '.error',
        item: {
          message: text('')
        }
      })
    }
  }),

  errorFormatter,

  stripeConnectButton: {
    scope: '.stripe-connect',
    href: attribute('href')
  },

  clickActivateDonationGoals: clickable('.activate-donations'),
  clickAddNew: clickable('.add'),
  clickRefreshAccount: clickable('.refresh'),
  clickStripeConnectButton: clickable('.stripe-connect')
});
