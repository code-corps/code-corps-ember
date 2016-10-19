import Ember from 'ember';

const {
  computed,
  Controller,
  inject: { service }
} = Ember;

export default Controller.extend({
  codeTheme: service(),
  onboarding: service(),
  session: service(),

  isOnboarding: computed.alias('onboarding.isOnboarding'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
