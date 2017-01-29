import Ember from 'ember';

const {
  computed,
  get,
  inject: { service },
  Mixin,
  set
} = Ember;

export default Mixin.create({
  currentUser: service(),
  onboarding: service(),

  user: computed.alias('currentUser.user'),

  actions: {
    continue() {
      let user = get(this, 'user');
      let onboarding = get(this, 'onboarding');
      let nextStateTransition = get(onboarding, 'nextStateTransition');
      let nextRoute = get(onboarding, 'nextRoute');
      set(user, 'stateTransition', nextStateTransition);
      user.save().then(() => {
        this.transitionToRoute(nextRoute);
      });
    }
  }
});
