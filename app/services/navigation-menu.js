import Ember from 'ember';

const {
  computed,
  get,
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  onboarding: service(),

  isDefault: computed.equal('menuType', 'default'),
  isOnboarding: computed.equal('menuType', 'onboarding'),

  menuType: computed('onboarding.isOnboarding', function() {
    let isOnboarding = get(this, 'onboarding.isOnboarding');
    if (isOnboarding) {
      return 'onboarding';
    } else {
      return 'default';
    }
  })
});
