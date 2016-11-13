import Ember from 'ember';

const {
  inject: { service },
  Mixin
} = Ember;

export default Mixin.create({
  currentUser: service(),
  onboarding: service(),

  beforeModel(transition) {
    let isOnboarding = this.get('onboarding.isOnboarding');
    let expectedOnboardingRoute = this.get('onboarding.currentRoute');
    let routes = this.get('onboarding.routes');
    let target = transition.targetName;
    let user = this.get('currentUser.user');
    if (isOnboarding && target !== expectedOnboardingRoute) {
      this._abortAndFixHistory(transition);
    } else if (isOnboarding) {
      return this._super(...arguments);
    } else if (user && routes.includes(target)) {
      this._abortAndFixHistory(transition);
      this.transitionTo('projects-list');
    }
  },

  _abortAndFixHistory(transition) {
    transition.abort();
    if (window.history) {
      window.history.forward();
    }
  }
});
