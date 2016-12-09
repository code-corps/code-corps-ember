import {
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
  visit: visitable(':organization/:project/settings/donations/goals'),

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

  clickActivateDonationGoals: clickable('.activate-donations'),
  clickAddNew: clickable('.add')
});
