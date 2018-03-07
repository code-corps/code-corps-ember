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

  donationGoals: collection('.donation-goals .donation-goal', { clickEdit: clickable('.edit') }),

  editedDonationGoals: collection('.donation-goals .donation-goal-edit', {
    amount: fillable('input[name=amount]'),
    description: fillable('textarea[name=description]'),
    clickSave: clickable('.save'),
    clickCancel: clickable('.cancel'),
    validationErrors: collection('.input-error', { message: text('') })
  }),

  errorFormatter,

  clickActivateDonationGoals: clickable('.activate-donations'),
  clickAddNew: clickable('.add')
});
