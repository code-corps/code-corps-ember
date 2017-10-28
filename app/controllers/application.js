import { not, alias, and } from '@ember/object/computed';
import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  codeTheme: service(),
  onboarding: service(),
  projectTaskBoard: service(),
  session: service(),

  isNotOnboarding: not('isOnboarding'),
  isNotViewingProjectTaskBoard: not('isViewingProjectTaskBoard'),
  isOnboarding: alias('onboarding.isOnboarding'),
  isViewingProjectTaskBoard: alias('projectTaskBoard.isViewing'),

  shouldShowFooter: and('isNotOnboarding', 'isNotViewingProjectTaskBoard'),
  shouldShowSpacer: alias('isNotViewingProjectTaskBoard'),

  actions: {
    invalidateSession() {
      get(this, 'session').invalidate();
    }
  }
});
