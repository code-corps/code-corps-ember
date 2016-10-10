import Ember from 'ember';

const {
  computed,
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  onboarding: service(),

  isDefault: computed.equal('menuType', 'default'),
  isOnboarding: computed.equal('menuType', 'onboarding'),

  menuType: computed('onboarding.isOnboarding', function() {
    let isOnboarding = this.get('onboarding.isOnboarding');
    if (isOnboarding) {
      return 'onboarding';
    } else {
      return 'default';
    }
  })
});
