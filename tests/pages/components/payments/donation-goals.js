import { hasClass, isVisible } from 'ember-cli-page-object';

export default {
  scope: '.donation-goals',

  hasPendingRequirementStatus: hasClass('panel'),
  hasRequiredStatus: hasClass('panel--highlighted'),
  hasVerifiedStatus: hasClass('panel--highlighted-green'),

  rendersHeader: isVisible('aside'),
  rendersLinkToDonationGoals: isVisible('a.activate-donations'),
  rendersSection: isVisible('[data-test-section]')
};
