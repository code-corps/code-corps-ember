import Ember from 'ember';

const {
  get,
  inject: { service },
  Mixin
} = Ember;

export default Mixin.create({
  currentUser: service(),
  onboarding: service(),

  beforeModel(transition) {
    let isOnboarding = get(this, 'onboarding.isOnboarding');
    let expectedOnboardingRoute = get(this, 'onboarding.currentRoute');
    let routes = get(this, 'onboarding.routes');
    let target = transition.targetName;
    let user = get(this, 'currentUser.user');
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
