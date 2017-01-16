import { hasClass, isVisible } from 'ember-cli-page-object';

export default {
  scope: '.donation-goals',

  hasPendingRequirementStatus: hasClass('account-setup__section--pending_requirement'),
  hasRequiredStatus: hasClass('account-setup__section--required'),
  hasVerifiedStatus: hasClass('account-setup__section--verified'),

  rendersHeader: isVisible('aside'),
  rendersLinkToDonationGoals: isVisible('a.activate-donations'),
  rendersSection: isVisible('section')
};
