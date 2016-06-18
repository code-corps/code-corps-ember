import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  codeTheme: service(),
  onboarding: service(),
  session: service(),

  isOnboarding: Ember.computed.alias('onboarding.isOnboarding'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
