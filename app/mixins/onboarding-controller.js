import Ember from 'ember';

export default Ember.Mixin.create({
  currentUser: Ember.inject.service(),
  onboarding: Ember.inject.service(),

  user: Ember.computed.alias('currentUser.user'),

  actions: {
    continue() {
      let user = this.get('user');
      let onboarding = this.get('onboarding');
      let nextStateTransition = onboarding.get('nextStateTransition');
      let nextRoute = onboarding.get('nextRoute');
      user.set('stateTransition', nextStateTransition);
      user.save().then(() => {
        this.transitionToRoute(nextRoute);
      });
    },
  }
});
