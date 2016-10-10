import Ember from 'ember';

const {
  computed,
  inject: { service },
  Mixin
} = Ember;

export default Mixin.create({
  currentUser: service(),
  onboarding: service(),

  user: computed.alias('currentUser.user'),

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
    }
  }
});
