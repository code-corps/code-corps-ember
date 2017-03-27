import Ember from 'ember';

const {
  computed,
  computed: { alias, equal },
  get,
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  onboarding: service(),
  routing: service('-routing'),

  currentRouteName: alias('routing.currentRouteName'),

  hasDonated: computed('user', function() {
    let user = get(this, 'user');
    return user.hasMany('stripeConnectSubscriptions').value() !== null;
  }),

  isDefault: equal('menuType', 'default'),
  isOnboarding: equal('menuType', 'onboarding'),
  isViewingOnboarding: alias('onboarding.isViewingOnboarding'),

  menuType: computed('onboarding.isOnboarding', 'isViewingOnboarding', function() {
    let isOnboarding = get(this, 'onboarding.isOnboarding');
    let isViewingOnboarding = get(this, 'isViewingOnboarding');
    if (isOnboarding || isViewingOnboarding) {
      return 'onboarding';
    } else {
      return 'default';
    }
  }),

  user: alias('currentUser.user')
});
