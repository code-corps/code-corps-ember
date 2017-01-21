import Ember from 'ember';

const {
  computed,
  Controller,
  inject: { service }
} = Ember;

export default Controller.extend({
  codeTheme: service(),
  onboarding: service(),
  projectTaskBoard: service(),
  session: service(),

  isNotOnboarding: computed.not('isOnboarding'),
  isNotViewingProjectTaskBoard: computed.not('isViewingProjectTaskBoard'),
  isOnboarding: computed.alias('onboarding.isOnboarding'),
  isViewingProjectTaskBoard: computed.alias('projectTaskBoard.isViewing'),

  shouldShowFooter: computed.and('isNotOnboarding', 'isNotViewingProjectTaskBoard'),
  shouldShowSpacer: computed.alias('isNotViewingProjectTaskBoard'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
