import {
  clickable,
  collection,
  isVisible
} from 'ember-cli-page-object';
import donationGoal from 'code-corps-ember/tests/pages/components/donation-goal';
import donationGoalEdit from 'code-corps-ember/tests/pages/components/donation-goal-edit';

export default {
  scope: '.donation-goals',

  add: {
    scope: '.add',
    click: clickable(),
    isVisible: isVisible()
  },

  cancel: {
    scope: '.cancel',
    click: clickable(),
    isVisible: isVisible()
  },

  donationGoalLoadings: collection('.donation-goal-loading'),
  donationGoals: collection('.donation-goal', donationGoal),
  donationGoalEdits: collection('.donation-goal-edit', donationGoalEdit),

  edit: {
    scope: '.edit',
    click: clickable(),
    isVisible: isVisible()
  },

  save: {
    scope: '.save',
    click: clickable(),
    isVisible: isVisible()
  }
};
